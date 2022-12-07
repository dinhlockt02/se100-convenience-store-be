import { ProductItemPresenter } from '../product-item/product-item.presenter';
import { UserPresenter } from '../user/user.presenter';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { InvoiceDetailEntity } from 'src/core/entities/invoice-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDetailPresenter {
  @ApiProperty({ type: ProductItemPresenter })
  productItem: ProductItemPresenter;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: Number })
  quantity: number;
  constructor(entity: InvoiceDetailEntity) {
    this.productItem = ProductItemPresenter.fromProductItemEntity(
      entity.productItem,
    );
    this.price = entity.price;
    this.quantity = entity.quantity;
  }
}

export class InvoicePresenter {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: Date })
  date: Date;
  @ApiProperty({ type: UserPresenter })
  creator: UserPresenter;
  @ApiProperty({ type: Number })
  total: number;
  @ApiProperty({ type: InvoiceDetailPresenter, isArray: true })
  invoiceDetails: InvoiceDetailPresenter[];

  constructor(entity: InvoiceEntity) {
    this.id = entity.id;
    this.date = entity.date;
    this.creator = new UserPresenter(entity.creator);
    this.total = entity.total;
    this.invoiceDetails = entity.invoiceDetails.map(
      (detail) => new InvoiceDetailPresenter(detail),
    );
  }
}
