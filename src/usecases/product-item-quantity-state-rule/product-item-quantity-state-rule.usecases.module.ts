import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { AddProductItemStateRuleUsecase } from './add-product-item-state-rule.usecase';
import { DeleteProductItemQuantityStateRuleByIdUsecase } from './delete-product-item-state-rule.usecase';
import { GetProductItemQuantityStateRuleByIdUsecase } from './get-product-item-state-rule-by-id.usecase';
import { GetProductItemStateRulesUsecase } from './get-product-item-state-rules.usecase';
import { UpdateProductItemStateRuleUsecase } from './update-product-item-state-rule.usecase';

@Module({
  imports: [RepositoriesModule],
  providers: [
    GetProductItemStateRulesUsecase,
    GetProductItemQuantityStateRuleByIdUsecase,
    AddProductItemStateRuleUsecase,
    UpdateProductItemStateRuleUsecase,
    DeleteProductItemQuantityStateRuleByIdUsecase,
  ],
  exports: [
    AddProductItemStateRuleUsecase,
    GetProductItemQuantityStateRuleByIdUsecase,
    GetProductItemStateRulesUsecase,
    UpdateProductItemStateRuleUsecase,
    DeleteProductItemQuantityStateRuleByIdUsecase,
  ],
})
export class ProductItemQuantityStateRuleUsecasesModule {}
