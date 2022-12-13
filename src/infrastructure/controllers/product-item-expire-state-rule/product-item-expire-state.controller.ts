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
import { AddProductItemExpireStateRuleUsecase } from 'src/usecases/product-item-expire-state-rule/add-product-item-expire-state-rule.usecase';
import { DeleteProductItemExpireStateRuleByIdUsecase } from 'src/usecases/product-item-expire-state-rule/delete-product-item-expire-state-rule.usecase';
import { GetProductItemExpireStateRuleByIdUsecase } from 'src/usecases/product-item-expire-state-rule/get-product-item-expire-state-rule-by-id.usecase';
import { GetProductItemExpireStateRulesUsecase } from 'src/usecases/product-item-expire-state-rule/get-product-item-expire-state-rules.usecase';
import { UpdateProductItemExpireStateRuleUsecase } from 'src/usecases/product-item-expire-state-rule/update-product-item-expire-state-rule.usecase';
import { ProductItemExpireStateRuleDto } from './product-item-expire-state.dto';
import { ProductItemExpireStateRulePresenter } from './product-item-expire-state.presenter';

@Controller('/product-item-expire-state-rule')
@ApiTags('product item expire state rule')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ProductItemExpireStateRuleController {
  constructor(
    private readonly getProductItemExpireStateRulesUsecase: GetProductItemExpireStateRulesUsecase,
    private readonly getProductItemExpireStateRuleByIdUsecase: GetProductItemExpireStateRuleByIdUsecase,
    private readonly addProductItemStateRuleUsecase: AddProductItemExpireStateRuleUsecase,
    private readonly updateProductItemStateRuleUsecase: UpdateProductItemExpireStateRuleUsecase,
    private readonly deleteProductItemExpireStateRuleByIdUsecase: DeleteProductItemExpireStateRuleByIdUsecase,
  ) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemExpireStateRulePresenter,
    isArray: true,
  })
  async get() {
    try {
      const rules = await this.getProductItemExpireStateRulesUsecase.execute();
      return rules.map((rule) =>
        ProductItemExpireStateRulePresenter.fromEntity(rule),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemExpireStateRulePresenter,
    isArray: false,
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const rule = await this.getProductItemExpireStateRuleByIdUsecase.execute(
        id,
      );
      return ProductItemExpireStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductItemExpireStateRulePresenter,
    isArray: false,
  })
  async post(
    @Body()
    productItemExpireStateRuleDto: ProductItemExpireStateRuleDto,
  ) {
    try {
      const rule = await this.addProductItemStateRuleUsecase.execute(
        productItemExpireStateRuleDto.stateName,
        productItemExpireStateRuleDto.val,
        productItemExpireStateRuleDto.color,
      );
      return ProductItemExpireStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemExpireStateRulePresenter,
    isArray: false,
  })
  async putById(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    productItemExpireStateRuleDto: ProductItemExpireStateRuleDto,
  ) {
    try {
      const rule = await this.updateProductItemStateRuleUsecase.execute(
        id,
        productItemExpireStateRuleDto.stateName,
        productItemExpireStateRuleDto.val,
        productItemExpireStateRuleDto.color,
      );
      return ProductItemExpireStateRulePresenter.fromEntity(rule);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductItemExpireStateRulePresenter,
    isArray: false,
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteProductItemExpireStateRuleByIdUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
