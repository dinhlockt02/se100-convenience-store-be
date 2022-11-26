import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  apiResponseInternalServerOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { CreateProductUsecase } from 'src/usecases/product/create-product.usecase';
import { DeleteProductUsecase } from 'src/usecases/product/delete-product.usecase';
import { GetProductByIdUsecase } from 'src/usecases/product/get-product-by-id.usecase';
import { GetProductsUsecase } from 'src/usecases/product/get-products.usecase';
import { UpdateProductUsecase } from 'src/usecases/product/update-product.usecase';
import { ProductDto } from './product.dto';
import { ProductPresenter } from './product.presenter';
@Controller('products')
@ApiTags('products')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ProductController {
  constructor(
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly getProductsUsecase: GetProductsUsecase,
    private readonly getProductByIdUsecase: GetProductByIdUsecase,
    private readonly deleteProductUsecase: DeleteProductUsecase,
    private readonly updateProductUsecase: UpdateProductUsecase,
  ) {}

  @Post()
  @ApiBody({
    type: ProductDto,
  })
  @ApiResponse({
    status: 201,
    type: ProductPresenter,
  })
  async createProduct(@Body() productDto: ProductDto) {
    try {
      const createdProduct = await this.createProductUsecase.execute(
        productDto.title,
        productDto.tax,
      );
      return new ProductPresenter(createdProduct);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: ProductPresenter,
  })
  async getProducts() {
    try {
      const products = await this.getProductsUsecase.execute();
      return products.map((product) => new ProductPresenter(product));
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ProductPresenter,
  })
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.getProductByIdUsecase.execute(id);
      return new ProductPresenter(product);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteProvider(@Param('id') id: string) {
    try {
      await this.deleteProductUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Put(':id')
  @ApiBody({
    type: ProductDto,
  })
  @ApiResponse({ status: 200, type: ProductPresenter })
  async updateProvider(
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
  ) {
    try {
      const product = await this.updateProductUsecase.execute(
        id,
        updateProductDto.title,
        updateProductDto.tax,
      );
      return new ProductPresenter(product);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
