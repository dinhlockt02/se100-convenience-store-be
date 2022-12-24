import { ApiProperty } from '@nestjs/swagger';
import {
  MonthReportEntity,
  WeekReportEntity,
  YearReportEntity,
} from 'src/core/entities/report.entity';
import { ProductPresenter } from '../product/product.presenter';

export class MonthReportPresenter {
  @ApiProperty()
  year: number;
  @ApiProperty()
  month: number;
  @ApiProperty()
  product: ProductPresenter;
  @ApiProperty()
  revenue: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  profit: number;

  constructor(entity: MonthReportEntity) {
    this.year = entity.year;
    this.month = entity.month;
    this.product = new ProductPresenter(entity.product);
    this.revenue = entity.revenue;
    this.quantity = entity.quantity;
    this.profit = entity.profit;
  }
}

export class YearReportPresenter {
  @ApiProperty()
  year: number;
  @ApiProperty()
  product: ProductPresenter;
  @ApiProperty()
  revenue: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  profit: number;

  constructor(entity: YearReportEntity) {
    this.year = entity.year;
    this.product = new ProductPresenter(entity.product);
    this.revenue = entity.revenue;
    this.quantity = entity.quantity;
    this.profit = entity.profit;
  }
}

export class WeekReportPresenter {
  @ApiProperty()
  year: number;
  @ApiProperty()
  week: number;
  @ApiProperty()
  product: ProductPresenter;
  @ApiProperty()
  revenue: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  profit: number;

  constructor(entity: WeekReportEntity) {
    this.year = entity.year;
    this.week = entity.week;
    this.product = new ProductPresenter(entity.product);
    this.revenue = entity.revenue;
    this.quantity = entity.quantity;
    this.profit = entity.profit;
  }
}
