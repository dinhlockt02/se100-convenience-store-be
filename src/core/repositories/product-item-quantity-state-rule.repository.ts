import { ProductItemQuantityStateRuleEntity } from '../entities/product-item-quantity-state-rule.entity';

export interface IProductItemQuantityStateRuleRepository {
  getProductItemQuantityStateRules(): Promise<
    ProductItemQuantityStateRuleEntity[]
  >;
  getProductItemQuantityStateRuleById(
    id: number,
  ): Promise<ProductItemQuantityStateRuleEntity>;

  addProductItemQuantityStateRule(
    entity: ProductItemQuantityStateRuleEntity,
  ): Promise<ProductItemQuantityStateRuleEntity>;

  updateProductItemQuantityStateRule(
    entity: ProductItemQuantityStateRuleEntity,
  ): Promise<ProductItemQuantityStateRuleEntity>;

  deleteProductItemQuantityStateRule(id: number);
}

export const IProductItemQuantityStateRuleRepositoryLabel =
  'IProductItemQuantityStateRuleRepositoryLabel';
