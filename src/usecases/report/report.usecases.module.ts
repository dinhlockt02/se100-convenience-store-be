import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { GetMonthReportUsecase } from './get-month-report.usecase';
import { GetWeekReportUsecase } from './get-week-report.usecase';
import { GetYearReportUsecase } from './get-year-report.usecase';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    GetWeekReportUsecase,
    GetYearReportUsecase,
    GetMonthReportUsecase,
  ],
  exports: [GetWeekReportUsecase, GetYearReportUsecase, GetMonthReportUsecase],
})
export class ReportUsecasesModule {}
