import { Inject } from '@nestjs/common';
import { RuleEntity } from 'src/core/entities/rule.entity';
import {
  IOtherRulesRepository,
  IOtherRulesRepositoryLabel,
  VAT_RULE,
} from 'src/core/repositories/other-rules.repository.interface';

export class UpdateVATUsecase {
  constructor(
    @Inject(IOtherRulesRepositoryLabel)
    private readonly otherRulesRepository: IOtherRulesRepository,
  ) {}
  execute(val: number): Promise<RuleEntity> {
    return this.otherRulesRepository.updateRuleById(VAT_RULE, val);
  }
}
