import {
  MonthReportEntity,
  WeekReportEntity,
  YearReportEntity,
} from '../entities/report.entity';

export interface IReportRepository {
  getWeekReport(
    day: number,
    month: number,
    year: number,
  ): Promise<WeekReportEntity[]>;
  getMonthReport(month: number, year: number): Promise<MonthReportEntity[]>;
  getYearReport(year: number): Promise<YearReportEntity[]>;
}

export const IReportRepositoryLabel = 'IReportRepositoryLabel';
