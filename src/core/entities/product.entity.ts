import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';

export class ProductEntity extends Entity {
  id: string;
  title: string;
  tax: number;
  providers: ProviderEntity[];
  productItems: ProductItemEntity[];
}
