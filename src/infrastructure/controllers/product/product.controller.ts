import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as CoreException from 'src/core/exceptions';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxies/usecase-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecase-proxies/usecase-proxy.module';
import { CreateProductUsecase } from 'src/usecases/product/create-product.usecase';
import { DeleteProductByIdUsecase } from 'src/usecases/product/delete-product-by-id.usecase';
import { GetProductbyIdUsecase } from 'src/usecases/product/get-product-by-id.usecase';
import { GetProductsUsecase } from 'src/usecases/product/get-products.usecase';
import { UpdateProductUsecase } from 'src/usecases/product/update-product.usecase';
import { ProductDto } from './product.dto';
import { ProductPresenter } from './product.presenter';

@Controller('products')
@ApiTags('products')
@ApiResponse({
  status: 400,
  description: 'Bad request, maybe body or id is invalid',
})
@ApiResponse({
  status: 404,
  description: 'Product not found',
})
export class ProductController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_PRODUCT_USECASE_PROXY)
    private readonly createProductUsecase: UseCaseProxy<CreateProductUsecase>,
    @Inject(UseCasesProxyModule.GET_PRODUCTS_USECASE_PROXY)
    private readonly getProductsUsecase: UseCaseProxy<GetProductsUsecase>,
    @Inject(UseCasesProxyModule.GET_PRODUCT_BY_ID_USECASE_PROXY)
    private readonly getProductByIdUsecase: UseCaseProxy<GetProductbyIdUsecase>,
    @Inject(UseCasesProxyModule.UPDATE_PRODUCT_USECASE_PROXY)
    private readonly updateProductUsecase: UseCaseProxy<UpdateProductUsecase>,
    @Inject(UseCasesProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY)
    private readonly deleteProductByIdUsecase: UseCaseProxy<DeleteProductByIdUsecase>,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: ProductPresenter,
  })
  async createProduct(@Body() createProductDto: ProductDto) {
    try {
      const createProductEntity = ProductDto.toEntity(createProductDto);
      const productEntity = await this.createProductUsecase
        .getInstance()
        .execute(createProductEntity);
      return new ProductPresenter(productEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Array<ProductPresenter>,
  })
  async getProducts() {
    try {
      const products = await this.getProductsUsecase.getInstance().execute();
      return products.map((product) => new ProductPresenter(product));
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: ProductPresenter,
  })
  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const productEntity = await this.getProductByIdUsecase
        .getInstance()
        .execute(id);
      return new ProductPresenter(productEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: ProductPresenter,
  })
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: ProductDto,
  ) {
    try {
      const updateProductEntity = ProductDto.toEntity(updateProductDto);
      updateProductEntity.id = id;
      const productEntity = await this.updateProductUsecase
        .getInstance()
        .execute(updateProductEntity);
      return new ProductPresenter(productEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Delete successful',
  })
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteProductByIdUsecase.getInstance().execute(id);
    } catch (error) {
      this.catchError(error);
    }
  }

  catchError(exception: Error) {
    if (exception instanceof CoreException.ConflictException) {
      throw new ConflictException(exception.message);
    }
    if (exception instanceof CoreException.ValidationException) {
      throw new BadRequestException(exception.errors);
    }
    if (exception instanceof CoreException.NotFoundException) {
      throw new NotFoundException(exception.message);
    }
    throw new InternalServerErrorException(exception.message);
  }
}
