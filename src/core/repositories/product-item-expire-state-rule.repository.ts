import { ProductItemExpireStateRuleEntity } from '../entities/product-item-expire-state-rule.entity';
import { ProductItemEntity } from '../entities/product-item.entity';

export interface IProductItemExpireStateRuleRepository {
  getProductItemExpireStateRules(): Promise<ProductItemExpireStateRuleEntity[]>;
  getProductItemExpireStateRuleById(
    id: number,
  ): Promise<ProductItemExpireStateRuleEntity>;

  addProductItemExpireStateRule(
    entity: ProductItemExpireStateRuleEntity,
  ): Promise<ProductItemExpireStateRuleEntity>;

  updateProductItemExpireStateRule(
    entity: ProductItemExpireStateRuleEntity,
  ): Promise<ProductItemExpireStateRuleEntity>;

  deleteProductItemExpireStateRule(id: number);

  updateState(productItems: ProductItemEntity[]): Promise<ProductItemEntity[]>;
}

export const IProductItemExpireStateRuleRepositoryLabel =
  'IProductItemExpireStateRuleRepositoryLabel';
