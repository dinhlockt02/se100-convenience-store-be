import {
  Controller,
  Logger,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  InternalServerErrorException,
  ParseFloatPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CoreException } from 'src/core/exceptions';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  apiResponseInternalServerOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { CreateUserUseCase } from 'src/usecases/user/create-user.usecase';
import { GetUserByIdUsecase } from 'src/usecases/user/get-users-by-id.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { GetVATUsecase } from 'src/usecases/vat/get-vat.usecase';
import { UpdateVATUsecase } from 'src/usecases/vat/update-vat.usecase';
import { CreateUserDto, UpdateUserDto } from '../user/user.dto';
import { UserPresenter } from '../user/user.presenter';
import { VatDto } from './vat.dto';
import { VATPresenter } from './vat.presenter';

@Controller('vat')
@ApiTags('vat')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class VATController {
  constructor(
    private readonly getVatUsecase: GetVATUsecase,
    private readonly updateVatUsecase: UpdateVATUsecase,
  ) {}

  @Get()
  @ApiOkResponse({
    type: VATPresenter,
  })
  async getVAT() {
    try {
      const vatEntity = await this.getVatUsecase.execute();
      return { ...vatEntity } as VATPresenter;
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Put()
  @ApiOkResponse({
    type: VATPresenter,
  })
  async updateVAT(@Body() vatDto: VatDto) {
    try {
      const vatEntity = await this.updateVatUsecase.execute(vatDto.val);
      return { ...vatEntity } as VATPresenter;
    } catch (error) {
      HandleExeption(error);
    }
  }
}
