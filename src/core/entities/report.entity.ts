import { Entity } from './entity';
import { ProductEntity } from './product.entity';

export class MonthReportEntity extends Entity {
  year: number;
  month: number;
  product: ProductEntity;
  revenue: number;
  quantity: number;
  profit: number;

  constructor(
    year: number,
    month: number,
    product: ProductEntity,
    revenue: number,
    quantity: number,
    profit: number,
  ) {
    super();
    this.year = year;
    this.month = month;
    this.product = product;
    this.revenue = revenue;
    this.quantity = quantity;
    this.profit = profit;
  }
}

export class YearReportEntity extends Entity {
  year: number;
  product: ProductEntity;
  revenue: number;
  quantity: number;
  profit: number;

  constructor(
    year: number,
    product: ProductEntity,
    revenue: number,
    quantity: number,
    profit: number,
  ) {
    super();
    this.year = year;
    this.product = product;
    this.revenue = revenue;
    this.quantity = quantity;
    this.profit = profit;
  }
}

export class WeekReportEntity extends Entity {
  year: number;
  week: number;
  product: ProductEntity;
  revenue: number;
  quantity: number;
  profit: number;
  constructor(
    year: number,
    week: number,
    product: ProductEntity,
    revenue: number,
    quantity: number,
    profit: number,
  ) {
    super();
    this.year = year;
    this.week = week;
    this.product = product;
    this.revenue = revenue;
    this.quantity = quantity;
    this.profit = profit;
  }
}
