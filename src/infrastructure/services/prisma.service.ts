import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CoreException } from 'src/core/exceptions';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
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
}
