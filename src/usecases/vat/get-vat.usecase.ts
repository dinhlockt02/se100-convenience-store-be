import { Inject } from '@nestjs/common';
import { RuleEntity } from 'src/core/entities/rule.entity';
import {
  IOtherRulesRepository,
  IOtherRulesRepositoryLabel,
  VAT_RULE,
} from 'src/core/repositories/other-rules.repository.interface';

export class GetVATUsecase {
  constructor(
    @Inject(IOtherRulesRepositoryLabel)
    private readonly otherRulesRepository: IOtherRulesRepository,
  ) {}
  execute(): Promise<RuleEntity> {
    return this.otherRulesRepository.getRuleById(VAT_RULE);
  }
}
