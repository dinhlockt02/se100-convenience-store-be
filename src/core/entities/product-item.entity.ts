import { IsArray, IsDate, IsInt, IsString, IsUrl, Min } from 'class-validator';
import { DeliveryNoteEntity } from './delivery-note.entity';
import { Entity } from './entity';
import { InvoiceDetailEntity } from './invoice-detail.entity';
import { ProductItemStateEntity } from './product-state.entity';
import { ProductEntity } from './product.entity';

export class ProductItemEntity extends Entity {
  @IsString()
  id: string;
  product: ProductEntity;
  deliveryNote: DeliveryNoteEntity;
  @IsDate()
  MFG: Date;
  @IsDate()
  EXP: Date;
  @IsInt()
  @Min(0)
  cost: number;
  @IsInt()
  @Min(0)
  price: number;
  @IsInt()
  @Min(0)
  initialQuantity: number;
  @IsInt()
  @Min(0)
  quantity: number;
  @IsString()
  description: string;
  image: string;
  @IsArray()
  invoiceDetails: InvoiceDetailEntity[];
  @IsArray()
  state: ProductItemStateEntity[];

  constructor(
    id: string,
    product: ProductEntity,
    deliveryNote: DeliveryNoteEntity,
    MFG: Date,
    EXP: Date,
    cost: number,
    price: number,
    quantity: number,
    initialQuantity: number,
    description: string,
    image: string,
    state: ProductItemStateEntity[],
  ) {
    super();
    this.id = id;
    this.product = product;
    this.deliveryNote = deliveryNote;
    this.MFG = MFG;
    this.EXP = EXP;
    this.cost = cost;
    this.price = price;
    this.quantity = quantity;
    this.initialQuantity = initialQuantity;
    this.description = description;
    this.image = image;
    this.invoiceDetails = [];
    this.state = state;
  }
}
