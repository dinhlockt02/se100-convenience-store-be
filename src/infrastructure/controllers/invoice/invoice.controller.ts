import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  apiResponseInternalServerOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { CreateInvoiceUsecase } from 'src/usecases/invoice/create-invoice.usecase';
import { GetInvoiceByIdUsecase } from 'src/usecases/invoice/get-invoice-by-id.usecase';
import { GetInvoicesUsecase } from 'src/usecases/invoice/get-invoice.usecase';
import { InvoiceDto } from './invoice.dto';
import { InvoicePresenter } from './invoice.presenter';

@Controller('invoices')
@ApiTags('invoices')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class InvoiceController {
  constructor(
    private readonly createInvoiceUsecase: CreateInvoiceUsecase,
    private readonly getInvoicesUsecase: GetInvoicesUsecase,
    private readonly getInvoiceByIdUsecase: GetInvoiceByIdUsecase,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: InvoicePresenter,
  })
  async post(@Body() invoiceDto: InvoiceDto) {
    try {
      const invoice = await this.createInvoiceUsecase.execute(
        invoiceDto.date,
        invoiceDto.userId,
        invoiceDto.total,
        invoiceDto.details,
      );
      return new InvoicePresenter(invoice);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: InvoicePresenter,
    isArray: true,
  })
  async get() {
    try {
      const invoices = await this.getInvoicesUsecase.execute();
      return invoices.map((invoice) => new InvoicePresenter(invoice));
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: InvoicePresenter,
    isArray: true,
  })
  async getById(@Param('id') id: string) {
    try {
      const invoice = await this.getInvoiceByIdUsecase.execute(id);
      return new InvoicePresenter(invoice);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
