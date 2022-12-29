import { Injectable } from '@nestjs/common';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { ProductItemStateEntity } from 'src/core/entities/product-state.entity';
import { IProductItemExpireStateRuleRepository } from 'src/core/repositories/product-item-expire-state-rule.repository';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { dateDiffInDays } from 'src/utils/daydiff';
import { ProductItemExpireStateRuleConverter } from './product-item-expire-state-rule.converter';

@Injectable()
export class ProductItemExpireStateRuleRepository
  implements IProductItemExpireStateRuleRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async getProductItemExpireStateRules(): Promise<
    ProductItemExpireStateRuleEntity[]
  > {
    const prismaRules = await this.prisma.productItemExpireStateRule.findMany();
    return prismaRules.map((prismaRule) =>
      ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleEntity(
        prismaRule,
      ),
    );
  }
  async getProductItemExpireStateRuleById(
    id: number,
  ): Promise<ProductItemExpireStateRuleEntity> {
    const prismaRule = await this.prisma.productItemExpireStateRule.findUnique({
      where: {
        id,
      },
    });
    return ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleEntity(
      prismaRule,
    );
  }
  async addProductItemExpireStateRule(
    entity: ProductItemExpireStateRuleEntity,
  ): Promise<ProductItemExpireStateRuleEntity> {
    const prismaRule = await this.prisma.productItemExpireStateRule.create({
      data: ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleCreateInput(
        entity,
      ),
    });
    return ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleEntity(
      prismaRule,
    );
  }
  async updateProductItemExpireStateRule(
    entity: ProductItemExpireStateRuleEntity,
  ): Promise<ProductItemExpireStateRuleEntity> {
    const prismaRule = await this.prisma.productItemExpireStateRule.update({
      where: {
        id: entity.id,
      },
      data: ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleUpdateInput(
        entity,
      ),
    });
    return ProductItemExpireStateRuleConverter.toProductItemExpireStateRuleEntity(
      prismaRule,
    );
  }
  async deleteProductItemExpireStateRule(id: number) {
    await this.prisma.productItemExpireStateRule.delete({
      where: {
        id,
      },
    });
  }

  async updateState(
    productItems: ProductItemEntity[],
  ): Promise<ProductItemEntity[]> {
    const productItemExpireStateRules =
      await this.getProductItemExpireStateRules();

    return productItems.map((productItem) => {
      const remainingDays = dateDiffInDays(new Date(), productItem.EXP);

      let matchRule = null;

      productItemExpireStateRules.forEach((rule) => {
        if (rule.val >= remainingDays) {
          if (matchRule == null) {
            matchRule = rule;
          } else if (matchRule != null && rule.val < matchRule.val) {
            matchRule = rule;
          }
        }
      });

      if (matchRule) {
        productItem.state.push(
          new ProductItemStateEntity(matchRule.stateName, matchRule.color),
        );
      }

      return productItem;
    });
  }
}
