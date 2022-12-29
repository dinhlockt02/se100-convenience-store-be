import { RuleEntity } from '../entities/rule.entity';

export interface IOtherRulesRepository {
  getRuleById(id: string): Promise<RuleEntity>;
  updateRuleById(id: string, val: number): Promise<RuleEntity>;
}

export const IOtherRulesRepositoryLabel = 'IOtherRulesRepositoryLabel';
export const VAT_RULE = 'vat';
