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
import { AddProductToProviderUsecase } from 'src/usecases/provider/add-product-to-provider.usecase';
import { CreateProviderUsecase } from 'src/usecases/provider/create-provider.usecase';
import { DeleteProviderUsecase } from 'src/usecases/provider/delete-provider.usecase';
import { GetProductByProviderIdUsecase } from 'src/usecases/provider/get-products-by-provider-id.usecase';
import { GetProviderByIdUsecase } from 'src/usecases/provider/get-provider-by-id.usecase';
import { GetProvidersUsecase } from 'src/usecases/provider/get-providers.usecase';
import { RemoveProductFromProviderUsecase } from 'src/usecases/provider/remove-product-from-provider.usecase';
import { UpdateProviderUsecase } from 'src/usecases/provider/update-provider.usecase';
import { ProductPresenter } from '../product/product.presenter';
import { CreateProviderDto as ProviderDto } from './provider.dto';
import { ProviderPresenter } from './provider.presenter';

@Controller('providers')
@ApiTags('providers')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ProviderController {
  constructor(
    private readonly createProviderUsecase: CreateProviderUsecase,
    private readonly getProvidersUsecase: GetProvidersUsecase,
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
    private readonly deleteProviderUsecase: DeleteProviderUsecase,
    private readonly updateProviderUsecase: UpdateProviderUsecase,
    private readonly addProductToProviderUsecase: AddProductToProviderUsecase,
    private readonly removeProductFromProviderUsecase: RemoveProductFromProviderUsecase,
    private readonly getProductsByProviderIdUsecase: GetProductByProviderIdUsecase,
  ) {}

  @Get('products/:providerId')
  @ApiResponse({ status: 200, type: ProductPresenter, isArray: true })
  async getProducts(@Param('providerId', ParseIntPipe) providerId: number) {
    try {
      const products = await this.getProductsByProviderIdUsecase.execute(
        providerId,
      );
      return products.map((product) => new ProductPresenter(product));
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post('products/:providerId/add')
  @ApiResponse({ status: 201, type: ProductPresenter, isArray: true })
  async addProduct(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() productId: string[],
  ) {
    try {
      const products = await this.addProductToProviderUsecase.execute(
        providerId,
        productId,
      );
      return products.map((product) => new ProductPresenter(product));
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post('products/:providerId/remove')
  @ApiResponse({ status: 200, type: ProductPresenter, isArray: true })
  async removeProduct(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() productId: string[],
  ) {
    try {
      const products = await this.removeProductFromProviderUsecase.execute(
        providerId,
        productId,
      );
      return products.map((product) => new ProductPresenter(product));
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post()
  @ApiBody({
    type: ProviderDto,
  })
  @ApiResponse({ status: 201, type: ProviderPresenter })
  async createProvider(@Body() createProviderDto: ProviderDto) {
    try {
      const provider = await this.createProviderUsecase.execute(
        createProviderDto.name,
        createProviderDto.address,
        createProviderDto.email,
        createProviderDto.phone,
        createProviderDto.representative,
      );
      return ProviderPresenter.fromEntity(provider);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: ProviderPresenter,
  })
  async getProviders() {
    try {
      const providers = await this.getProvidersUsecase.execute();
      return providers.map((provider) =>
        ProviderPresenter.fromEntity(provider),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ProviderPresenter })
  async getProvider(@Param('id', ParseIntPipe) id: number) {
    try {
      const provider = await this.getProviderByIdUsecase.execute(id);
      return ProviderPresenter.fromEntity(provider);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteProvider(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteProviderUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Put(':id')
  @ApiBody({
    type: ProviderDto,
  })
  @ApiResponse({ status: 200, type: ProviderPresenter })
  async updateProvider(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: ProviderDto,
  ) {
    try {
      const provider = await this.updateProviderUsecase.execute(
        id,
        updateProviderDto.name,
        updateProviderDto.address,
        updateProviderDto.email,
        updateProviderDto.phone,
        updateProviderDto.representative,
      );
      return ProviderPresenter.fromEntity(provider);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
