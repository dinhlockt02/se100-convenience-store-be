import { ApiProperty } from '@nestjs/swagger';
import {
  MonthReportEntity,
  WeekReportEntity,
  YearReportEntity,
} from 'src/core/entities/report.entity';
import { ProductPresenter } from '../product/product.presenter';
import * as ExcelJS from 'exceljs';

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

export function generateWeekReportExcel(
  report: WeekReportPresenter[],
): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(
    `Week ${report[0].week} Year ${report[0].year}`,
    {
      headerFooter: {
        firstHeader: `Week ${report[0].week} Year ${report[0].year}`,
      },
    },
  );
  sheet.columns = [
    {
      header: 'Product',
      key: 'title',
      width: 20,
      font: {
        name: 'Times New Roman',
        size: 14,
      },
    },
    {
      header: 'Revenue',
      key: 'revenue',
      width: 20,
      font: {
        name: 'Times New Roman',
        size: 14,
      },
    },
    {
      header: 'Quantity',
      key: 'quantity',
      width: 20,
      font: {
        name: 'Times New Roman',
        size: 14,
      },
    },
    {
      header: 'Profit',
      key: 'profit',
      width: 20,
      font: {
        name: 'Times New Roman',
        size: 14,
      },
    },
  ];
  sheet.addRows(
    report.map((r) => {
      return { ...r, title: r.product.title };
    }),
    'i',
  );
  return workbook;
}
