import { ParseIntPipe, StreamableFile } from '@nestjs/common';
import { Controller, Get, Query, Res } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CoreException } from 'src/core/exceptions';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseInternalServerOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { GetMonthReportUsecase } from 'src/usecases/report/get-month-report.usecase';
import { GetWeekReportUsecase } from 'src/usecases/report/get-week-report.usecase';
import { GetYearReportUsecase } from 'src/usecases/report/get-year-report.usecase';
import {
  generateMonthReportExcel,
  generateWeekReportExcel,
  generateYearReportExcel,
  MonthReportPresenter,
  WeekReportPresenter,
  YearReportPresenter,
} from './report.presenter';

@Controller('report')
@ApiTags('report')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class ReportController {
  constructor(
    private readonly getWeekReportUsecase: GetWeekReportUsecase,
    private readonly getMonthReportUsecase: GetMonthReportUsecase,
    private readonly getYearReportUsecase: GetYearReportUsecase,
  ) {}

  @Get('week')
  @ApiResponse({ status: 200, type: WeekReportPresenter, isArray: true })
  async getWeekReports(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('day', ParseIntPipe) day: number,
  ) {
    try {
      const weekReports = await this.getWeekReportUsecase.execute(
        year,
        month,
        day,
      );
      return weekReports.map(
        (weekReport) => new WeekReportPresenter(weekReport),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get('excel/week')
  // @ApiResponse({ status: 200, type: WeekReportPresenter, isArray: true })
  async getWeekReportExcel(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('day', ParseIntPipe) day: number,
  ) {
    try {
      const weekReports = await this.getWeekReportUsecase.execute(
        year,
        month,
        day,
      );
      const weekReportsPresenter = weekReports.map(
        (weekReport) => new WeekReportPresenter(weekReport),
      );
      if (weekReportsPresenter.length == 0) {
        throw new CoreException.NotFoundException('No data');
      }
      const workbook = generateWeekReportExcel(weekReportsPresenter);
      const buffer = await workbook.xlsx.writeBuffer();
      const filename = `Week Report ${day}-${month}-${year}`;

      return new StreamableFile(new Uint8Array(buffer), {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: `attachment;filename=${filename}.xlsx`,
      });
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get('month')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: MonthReportPresenter,
  })
  async getMonthReports(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ) {
    try {
      const monthReports = await this.getMonthReportUsecase.execute(
        year,
        month,
      );
      return monthReports.map(
        (monthReport) => new MonthReportPresenter(monthReport),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get('excel/month')
  // @ApiResponse({ status: 200, type: WeekReportPresenter, isArray: true })
  async getMonthReportExcel(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ) {
    try {
      const monthReports = await this.getMonthReportUsecase.execute(
        year,
        month,
      );
      const monthReportsPresenter = monthReports.map(
        (monthReport) => new MonthReportPresenter(monthReport),
      );
      if (monthReportsPresenter.length == 0) {
        throw new CoreException.NotFoundException('No data');
      }
      const workbook = generateMonthReportExcel(monthReportsPresenter);
      const buffer = await workbook.xlsx.writeBuffer();
      const filename = `Month Report ${month}-${year}`;

      return new StreamableFile(new Uint8Array(buffer), {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: `attachment;filename=${filename}.xlsx`,
      });
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get('year')
  @ApiResponse({ status: 200, type: YearReportPresenter, isArray: true })
  async getYearReports(@Query('year', ParseIntPipe) year: number) {
    try {
      const yearReports = await this.getYearReportUsecase.execute(year);
      return yearReports.map(
        (yearReport) => new YearReportPresenter(yearReport),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get('excel/year')
  async getYearReportExcel(@Query('year', ParseIntPipe) year: number) {
    try {
      const yearReports = await this.getYearReportUsecase.execute(year);
      const yearReportsPresenter = yearReports.map(
        (yearReport) => new YearReportPresenter(yearReport),
      );
      if (yearReportsPresenter.length == 0) {
        throw new CoreException.NotFoundException('No data');
      }
      const workbook = generateYearReportExcel(yearReportsPresenter);
      const buffer = await workbook.xlsx.writeBuffer();
      const filename = `Year Report ${year}`;

      return new StreamableFile(new Uint8Array(buffer), {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: `attachment;filename=${filename}.xlsx`,
      });
    } catch (error) {
      HandleExeption(error);
    }
  }
}
