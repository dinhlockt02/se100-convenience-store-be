import { Prisma, ProductItemExpireStateRule } from '@prisma/client';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';

export class ProductItemExpireStateRuleConverter {
  static toProductItemExpireStateRuleCreateInput(
    ruleEntity: ProductItemExpireStateRuleEntity,
  ): Prisma.ProductItemExpireStateRuleCreateInput {
    return {
      stateName: ruleEntity.stateName,
      val: ruleEntity.val,
      color: ruleEntity.color,
    };
  }
  static toProductItemExpireStateRuleUpdateInput(
    ruleEntity: ProductItemExpireStateRuleEntity,
  ): Prisma.ProductItemExpireStateRuleUpdateInput {
    return {
      stateName: ruleEntity.stateName,
      val: ruleEntity.val,
      color: ruleEntity.color,
    };
  }
  static toProductItemExpireStateRuleEntity(
    productItemExpireStateRule: ProductItemExpireStateRule,
  ): ProductItemExpireStateRuleEntity {
    if (!productItemExpireStateRule) {
      return null;
    }

    return new ProductItemExpireStateRuleEntity(
      productItemExpireStateRule.id,
      productItemExpireStateRule.stateName,
      productItemExpireStateRule.val,
      productItemExpireStateRule.color,
    );
  }
}
