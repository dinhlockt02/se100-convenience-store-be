import { Inject, Injectable } from '@nestjs/common';
import { WeekReportEntity } from 'src/core/entities/report.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IReportRepository,
  IReportRepositoryLabel,
} from 'src/core/repositories/report.repository.interface';

@Injectable()
export class GetWeekReportUsecase {
  constructor(
    @Inject(IReportRepositoryLabel)
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute(
    year: number,
    month: number,
    day: number,
  ): Promise<WeekReportEntity[]> {
    const date = new Date(`${year}-${month}-${day}`);
    if (date.toString() === 'Invalid Date') {
      throw new CoreException.ValidationException('Invalid date', [
        'Invalid date',
      ]);
    }
    return this.reportRepository.getWeekReport(day, month, year);
  }
}
