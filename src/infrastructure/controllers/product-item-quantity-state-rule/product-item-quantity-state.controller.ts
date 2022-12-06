import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseInternalServerOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { AddProductItemStateRuleUsecase } from 'src/usecases/product-item-quantity-state-rule/add-product-item-state-rule.usecase';
import { DeleteProductItemQuantityStateRuleByIdUsecase } from 'src/usecases/product-item-quantity-state-rule/delete-product-item-state-rule.usecase';
import { GetProductItemQuantityStateRuleByIdUsecase } from 'src/usecases/product-item-quantity-state-rule/get-product-item-state-rule-by-id.usecase';
import { GetProductItemStateRulesUsecase } from 'src/usecases/product-item-quantity-state-rule/get-product-item-state-rules.usecase';
import { UpdateProductItemStateRuleUsecase } from 'src/usecases/product-item-quantity-state-rule/update-product-item-state-rule.usecase';
import { ProductItemQuantityStateRuleDto } from './product-item-quantity-state.dto';
import { ProductItemQuantityStateRulePresenter } from './product-item-quantity-state.presenter';

@Controller('/product-item-quantity-state-rule')
@ApiTags('product item quantity state rule')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ProductItemQuantityStateRuleController {
  constructor(
    private readonly getProductItemQuantityStateRulesUsecase: GetProductItemStateRulesUsecase,
    private readonly getProductItemQuantityStateRuleByIdUsecase: GetProductItemQuantityStateRuleByIdUsecase,
    private readonly addProductItemStateRuleUsecase: AddProductItemStateRuleUsecase,
    private readonly updateProductItemStateRuleUsecase: UpdateProductItemStateRuleUsecase,
    private readonly deleteProductItemQuantityStateRuleByIdUsecase: DeleteProductItemQuantityStateRuleByIdUsecase,
  ) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemQuantityStateRulePresenter,
    isArray: true,
  })
  async get() {
    try {
      const rules =
        await this.getProductItemQuantityStateRulesUsecase.execute();
      return rules.map((rule) =>
        ProductItemQuantityStateRulePresenter.fromEntity(rule),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemQuantityStateRulePresenter,
    isArray: false,
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const rule =
        await this.getProductItemQuantityStateRuleByIdUsecase.execute(id);
      return ProductItemQuantityStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductItemQuantityStateRulePresenter,
    isArray: false,
  })
  async post(
    @Body()
    productItemQuantityStateRuleDto: ProductItemQuantityStateRuleDto,
  ) {
    try {
      const rule = await this.addProductItemStateRuleUsecase.execute(
        productItemQuantityStateRuleDto.stateName,
        productItemQuantityStateRuleDto.minVal,
        productItemQuantityStateRuleDto.maxVal,
        productItemQuantityStateRuleDto.color,
      );
      return ProductItemQuantityStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemQuantityStateRulePresenter,
    isArray: false,
  })
  async putById(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    productItemQuantityStateRuleDto: ProductItemQuantityStateRuleDto,
  ) {
    try {
      const rule = await this.updateProductItemStateRuleUsecase.execute(
        id,
        productItemQuantityStateRuleDto.stateName,
        productItemQuantityStateRuleDto.minVal,
        productItemQuantityStateRuleDto.maxVal,
        productItemQuantityStateRuleDto.color,
      );
      return ProductItemQuantityStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemQuantityStateRulePresenter,
    isArray: false,
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteProductItemQuantityStateRuleByIdUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
