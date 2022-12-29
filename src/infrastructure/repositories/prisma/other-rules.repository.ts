import { Injectable } from '@nestjs/common';
import { RuleEntity } from 'src/core/entities/rule.entity';
import { IOtherRulesRepository } from 'src/core/repositories/other-rules.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';

@Injectable()
export class OtherRulesRepository implements IOtherRulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRuleById(id: string): Promise<RuleEntity> {
    let rule = await this.prisma.otherRule.findFirst({
      where: {
        id: id,
      },
    });
    if (!rule) {
      rule = await this.prisma.otherRule.create({
        data: {
          id: id,
          val: 0,
        },
      });
    }
    return {
      id: rule.id,
      val: rule.val,
    } as RuleEntity;
  }
  async updateRuleById(id: string, val: number): Promise<RuleEntity> {
    let rule = await this.prisma.otherRule.findFirst({
      where: {
        id: id,
      },
    });
    if (!rule) {
      rule = await this.prisma.otherRule.create({
        data: {
          id: id,
          val: val,
        },
      });
    } else {
      rule = await this.prisma.otherRule.update({
        where: {
          id: id,
        },
        data: {
          val: val,
        },
      });
    }
    return {
      id: rule.id,
      val: rule.val,
    } as RuleEntity;
  }
}
