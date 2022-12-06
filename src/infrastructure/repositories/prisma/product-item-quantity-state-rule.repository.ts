import { Injectable } from '@nestjs/common';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { ProductItemStateEntity } from 'src/core/entities/product-state.entity';
import { IProductItemQuantityStateRuleRepository } from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductItemQuantityStateRuleConverter } from './product-item-quantity-state-rule.converter';

@Injectable()
export class ProductItemQuantityStateRuleRepository
  implements IProductItemQuantityStateRuleRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async getProductItemQuantityStateRules(): Promise<
    ProductItemQuantityStateRuleEntity[]
  > {
    const prismaRules =
      await this.prisma.productItemQuantityStateRule.findMany();
    return prismaRules.map((prismaRule) =>
      ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleEntity(
        prismaRule,
      ),
    );
  }
  async getProductItemQuantityStateRuleById(
    id: number,
  ): Promise<ProductItemQuantityStateRuleEntity> {
    const prismaRule =
      await this.prisma.productItemQuantityStateRule.findUnique({
        where: {
          id,
        },
      });
    return ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleEntity(
      prismaRule,
    );
  }
  async addProductItemQuantityStateRule(
    entity: ProductItemQuantityStateRuleEntity,
  ): Promise<ProductItemQuantityStateRuleEntity> {
    const prismaRule = await this.prisma.productItemQuantityStateRule.create({
      data: ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleCreateInput(
        entity,
      ),
    });
    return ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleEntity(
      prismaRule,
    );
  }
  async updateProductItemQuantityStateRule(
    entity: ProductItemQuantityStateRuleEntity,
  ): Promise<ProductItemQuantityStateRuleEntity> {
    const prismaRule = await this.prisma.productItemQuantityStateRule.update({
      where: {
        id: entity.id,
      },
      data: ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleUpdateInput(
        entity,
      ),
    });
    return ProductItemQuantityStateRuleConverter.toProductItemQuantityStateRuleEntity(
      prismaRule,
    );
  }
  async deleteProductItemQuantityStateRule(id: number) {
    await this.prisma.productItemQuantityStateRule.delete({
      where: {
        id,
      },
    });
  }

  async updateState(
    productItems: ProductItemEntity[],
  ): Promise<ProductItemEntity[]> {
    const productItemQuantityStateRules =
      await this.getProductItemQuantityStateRules();
    return productItems.map((productItem) => {
      const matchRule = productItemQuantityStateRules.find(
        (rule) =>
          rule.maxVal >= productItem.quantity &&
          productItem.quantity >= rule.minVal,
      );

      if (matchRule) {
        productItem.state.push(
          new ProductItemStateEntity(matchRule.stateName, matchRule.color),
        );
      }

      return productItem;
    });
  }
}
