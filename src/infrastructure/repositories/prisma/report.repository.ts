import { Injectable } from '@nestjs/common';
import {
  WeekReportEntity,
  MonthReportEntity,
  YearReportEntity,
} from 'src/core/entities/report.entity';
import { IReportRepository } from 'src/core/repositories/report.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductConverter } from './product.converter';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getWeekReport(
    day: number,
    month: number,
    year: number,
  ): Promise<WeekReportEntity[]> {
    const dateString = `${year}-${month}-${day}`;
    const rs = await this.prisma.$queryRaw<
      {
        week: bigint;
        revenue: number;
        quantity: number;
        productId: number;
        profit: number;
      }[]
    >`
      SELECT
      WEEK(DATE(${dateString}), 1) as week,
      SUM(InvoiceDetail.quantity * InvoiceDetail.price) as revenue,
      SUM(InvoiceDetail.quantity * (InvoiceDetail.price - ProductItem.cost)) as profit,
      SUM(InvoiceDetail.quantity) as quantity, 
      ProductItem.productId AS productId
      FROM Invoice 
      INNER JOIN InvoiceDetail ON Invoice.id = InvoiceDetail.invoiceId
      INNER JOIN ProductItem ON InvoiceDetail.productItemId = ProductItem.id
      AND WEEK(Invoice.date, 1) = WEEK(DATE(${dateString}), 1)
      GROUP BY ProductItem.productId
    `;
    const reportEntities = await Promise.all(
      rs.map(async (r) => {
        const product = await this.prisma.product.findUnique({
          where: {
            id: r.productId,
          },
        });
        const reportEnitty = new WeekReportEntity(
          year,
          Number(r.week),
          ProductConverter.fromPrismaProduct(product),
          Number(r.revenue),
          Number(r.quantity),
          Number(r.profit),
        );
        return reportEnitty;
      }),
    );
    return reportEntities;
  }
  async getMonthReport(
    month: number,
    year: number,
  ): Promise<MonthReportEntity[]> {
    const rs = await this.prisma.$queryRaw<
      {
        revenue: number;
        quantity: number;
        productId: number;
        profit: number;
      }[]
    >`
    SELECT 
    SUM(InvoiceDetail.quantity * InvoiceDetail.price) as revenue,
    SUM(InvoiceDetail.quantity * (InvoiceDetail.price - ProductItem.cost)) as profit,
    SUM(InvoiceDetail.quantity) as quantity, 
    ProductItem.productId AS productId
    FROM Invoice 
    INNER JOIN InvoiceDetail ON Invoice.id = InvoiceDetail.invoiceId
    INNER JOIN ProductItem ON InvoiceDetail.productItemId = ProductItem.id
    WHERE MONTH(Invoice.date) = ${month}
    AND YEAR(Invoice.date) = ${year}
    GROUP BY ProductItem.productId
    `;
    const reportEntities = await Promise.all(
      rs.map(async (r) => {
        const product = await this.prisma.product.findUnique({
          where: {
            id: r.productId,
          },
        });
        const reportEnitty = new MonthReportEntity(
          year,
          month,
          ProductConverter.fromPrismaProduct(product),
          Number(r.revenue),
          Number(r.quantity),
          Number(r.profit),
        );
        return reportEnitty;
      }),
    );
    return reportEntities;
  }
  async getYearReport(year: number): Promise<YearReportEntity[]> {
    const rs = await this.prisma.$queryRaw<
      {
        revenue: number;
        quantity: number;
        productId: number;
        profit: number;
      }[]
    >`
    SELECT 
    SUM(InvoiceDetail.quantity * InvoiceDetail.price) as revenue,
    SUM(InvoiceDetail.quantity) as quantity, 
    SUM(InvoiceDetail.quantity * (InvoiceDetail.price - ProductItem.cost)) as profit,
    ProductItem.productId AS productId
    FROM Invoice 
    INNER JOIN InvoiceDetail ON Invoice.id = InvoiceDetail.invoiceId
    INNER JOIN ProductItem ON InvoiceDetail.productItemId = ProductItem.id
    AND YEAR(Invoice.date) = ${year}
    GROUP BY ProductItem.productId
    `;

    const reportEntities = await Promise.all(
      rs.map(async (r) => {
        const product = await this.prisma.product.findUnique({
          where: {
            id: r.productId,
          },
        });
        const reportEnitty = new YearReportEntity(
          year,
          ProductConverter.fromPrismaProduct(product),
          Number(r.revenue),
          Number(r.quantity),
          Number(r.profit),
        );
        return reportEnitty;
      }),
    );
    return reportEntities;
  }
}
