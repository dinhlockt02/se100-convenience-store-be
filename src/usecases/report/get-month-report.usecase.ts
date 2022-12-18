import { Inject, Injectable } from '@nestjs/common';
import { MonthReportEntity } from 'src/core/entities/report.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IReportRepository,
  IReportRepositoryLabel,
} from 'src/core/repositories/report.repository.interface';

@Injectable()
export class GetMonthReportUsecase {
  constructor(
    @Inject(IReportRepositoryLabel)
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute(year: number, month: number): Promise<MonthReportEntity[]> {
    if (month < 1 || month > 12) {
      throw new CoreException.ValidationException('Invalid date', [
        'Invalid date',
      ]);
    }
    return this.reportRepository.getMonthReport(month, year);
  }
}
