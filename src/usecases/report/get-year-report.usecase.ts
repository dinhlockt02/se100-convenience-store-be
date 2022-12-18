import { Inject, Injectable } from '@nestjs/common';
import { YearReportEntity } from 'src/core/entities/report.entity';
import {
  IReportRepository,
  IReportRepositoryLabel,
} from 'src/core/repositories/report.repository.interface';

@Injectable()
export class GetYearReportUsecase {
  constructor(
    @Inject(IReportRepositoryLabel)
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute(year: number): Promise<YearReportEntity[]> {
    return this.reportRepository.getYearReport(year);
  }
}
