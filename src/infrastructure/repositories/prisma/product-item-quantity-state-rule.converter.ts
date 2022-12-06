import { Prisma, ProductItemQuantityStateRule } from '@prisma/client';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';

export class ProductItemQuantityStateRuleConverter {
  static toProductItemQuantityStateRuleCreateInput(
    ruleEntity: ProductItemQuantityStateRuleEntity,
  ): Prisma.ProductItemQuantityStateRuleCreateInput {
    return {
      stateName: ruleEntity.stateName,
      minVal: ruleEntity.minVal,
      maxVal: ruleEntity.maxVal,
      color: ruleEntity.color,
    };
  }
  static toProductItemQuantityStateRuleUpdateInput(
    ruleEntity: ProductItemQuantityStateRuleEntity,
  ): Prisma.ProductItemQuantityStateRuleUpdateInput {
    return {
      stateName: ruleEntity.stateName,
      minVal: ruleEntity.minVal,
      maxVal: ruleEntity.maxVal,
      color: ruleEntity.color,
    };
  }
  static toProductItemQuantityStateRuleEntity(
    productItemQuantityStateRule: ProductItemQuantityStateRule,
  ): ProductItemQuantityStateRuleEntity {
    if (!productItemQuantityStateRule) {
      return null;
    }
    return new ProductItemQuantityStateRuleEntity(
      productItemQuantityStateRule.id,
      productItemQuantityStateRule.stateName,
      productItemQuantityStateRule.minVal,
      productItemQuantityStateRule.maxVal,
      productItemQuantityStateRule.color,
    );
  }
}
