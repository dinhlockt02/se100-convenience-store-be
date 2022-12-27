import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { async } from 'rxjs';
import { CoreException } from 'src/core/exceptions';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$use(this.deliveryNoteIdMiddleware);
    this.$use(this.productItemIdMiddleware);
    this.$use(this.invoiceIdMiddleware);
  }

  quantityStateRuleMiddleware: Prisma.Middleware = async (
    params: Prisma.MiddlewareParams,
    next,
  ) => {
    if (
      params.model == 'ProductItemQuantityStateRule' &&
      (params.action == 'create' ||
        params.action == 'update' ||
        params.action == 'createMany' ||
        params.action == 'updateMany')
    ) {
      const quantityStateRule =
        await this.productItemQuantityStateRule.findFirst({
          where: {
            OR: [
              {
                maxVal: {
                  gte: params.args.data.maxVal,
                },
                minVal: {
                  lte: params.args.data.maxVal,
                },
              },
              {
                maxVal: {
                  gte: params.args.data.minVal,
                },
                minVal: {
                  lte: params.args.data.minVal,
                },
              },
            ],
            NOT: {
              // params.args.data.id,
            },
          },
        });
      if (quantityStateRule) {
        throw new CoreException.DatabaseException('invalid range');
      }
    }
    return next(params);
  };

  deliveryNoteIdMiddleware: Prisma.Middleware = async (
    params: Prisma.MiddlewareParams,
    next,
  ) => {
    if (params.model == 'DeliveryNote' && params.action == 'create') {
      params.args.data.id = await this.generateDeliveryNoteId(
        params.args.data.date,
        params.args.data.provider.connect.id,
      );
    }

    return await next(params);
  };

  generateDeliveryNoteId = async (
    date: Date,
    providerId: number,
  ): Promise<string> => {
    const d = `${String(date.getDate()).padStart(2, '0')}${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}${date.getFullYear().toString().slice(2)}`;
    const [{ c: order }] = await this.$queryRaw<
      {
        c: number;
      }[]
    >`
    SELECT COUNT(*) + 1 as c
    FROM DeliveryNote as D
    WHERE DAY(D.date) = ${date.getDate()}
    AND MONTH(D.date) = ${date.getMonth() + 1}
    AND YEAR(D.date) = ${date.getFullYear()}
    AND D.providerId = ${providerId}`;
    return `${String(providerId).padStart(3, '0')}${d}${String(order).padStart(
      1,
      '0',
    )}`;
  };

  productItemIdMiddleware: Prisma.Middleware = async (
    params: Prisma.MiddlewareParams,
    next,
  ) => {
    const m = {};
    if (params.model == 'ProductItem' && params.action == 'createMany') {
      params.args.data.forEach((data) => {
        const prefix = `${data.deliveryNoteId}${String(data.productId).padStart(
          4,
          '0',
        )}`;
        if (prefix in m) {
          m[prefix]++;
        } else {
          m[prefix] = 1;
        }
        data.id = `${prefix}${String(m[prefix]).padStart(3, '0')}`;
      });
    }

    return await next(params);
  };

  invoiceIdMiddleware: Prisma.Middleware = async (
    params: Prisma.MiddlewareParams,
    next,
  ) => {
    if (params.model == 'Invoice' && params.action == 'create') {
      params.args.data.id = await this.generateInvoiveId(params.args.data.date);
    }
    return await next(params);
  };

  async generateInvoiveId(date: Date): Promise<string> {
    const d = `${String(date.getDate()).padStart(2, '0')}${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}${date.getFullYear()}`;
    const [{ c: order }] = await this.$queryRaw<
      {
        c: number;
      }[]
    >`
    SELECT COUNT(*) + 1 as c
    FROM Invoice as I
    WHERE DAY(I.date) = ${date.getDate()}
    AND MONTH(I.date) = ${date.getMonth() + 1}
    AND YEAR(I.date) = ${date.getFullYear()}`;
    return `${d}${String(order).padStart(4, '0')}`;
  }
}
