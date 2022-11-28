import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  apiResponseInternalServerOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { AddProductItemUsecase } from 'src/usecases/product-item/add-product-item.usecase';
import { RemoveProductItemUsecase } from 'src/usecases/product-item/remove-product-item.usecase';
import { ProductItemDto } from './product-item.dto';
import { ProductItemPresenter } from './product-item.presenter';

@Controller('/product-items')
@ApiTags('product items')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ProductItemController {
  constructor(
    private readonly addProductItemUsecase: AddProductItemUsecase,
    private readonly removeProductItemUsecase: RemoveProductItemUsecase,
  ) {}
  @Post()
  @ApiResponse({
    status: 201,
    type: ProductItemPresenter,
  })
  async addProductItem(@Body() productItemDto: ProductItemDto) {
    try {
      const addedProductItem = await this.addProductItemUsecase.execute(
        productItemDto.productId,
        productItemDto.deliveryNoteId,
        productItemDto.MFG,
        productItemDto.EXP,
        productItemDto.cost,
        productItemDto.price,
        productItemDto.quantity,
        productItemDto.description,
        productItemDto.image,
      );
      return ProductItemPresenter.fromProductItemEntity(addedProductItem);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async removeProductItem(@Param('id') id: string) {
    try {
      await this.removeProductItemUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
