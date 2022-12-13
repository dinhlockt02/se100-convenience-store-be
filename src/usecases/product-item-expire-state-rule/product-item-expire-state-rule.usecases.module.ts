import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { AddProductItemExpireStateRuleUsecase } from './add-product-item-expire-state-rule.usecase';
import { DeleteProductItemExpireStateRuleByIdUsecase } from './delete-product-item-expire-state-rule.usecase';
import { GetProductItemExpireStateRuleByIdUsecase } from './get-product-item-expire-state-rule-by-id.usecase';
import { GetProductItemExpireStateRulesUsecase } from './get-product-item-expire-state-rules.usecase';
import { UpdateProductItemExpireStateRuleUsecase } from './update-product-item-expire-state-rule.usecase';

@Module({
  imports: [RepositoriesModule],
  providers: [
    GetProductItemExpireStateRulesUsecase,
    GetProductItemExpireStateRuleByIdUsecase,
    AddProductItemExpireStateRuleUsecase,
    UpdateProductItemExpireStateRuleUsecase,
    DeleteProductItemExpireStateRuleByIdUsecase,
  ],
  exports: [
    GetProductItemExpireStateRulesUsecase,
    GetProductItemExpireStateRuleByIdUsecase,
    AddProductItemExpireStateRuleUsecase,
    UpdateProductItemExpireStateRuleUsecase,
    DeleteProductItemExpireStateRuleByIdUsecase,
  ],
})
export class ProductItemExpireStateRuleUsecasesModule {}
