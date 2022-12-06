import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  apiResponseInternalServerOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { CreateDeliveryNoteUsecase } from 'src/usecases/delivery-note/create-delivery-note.usecase';
import { DeleteDeliveryNoteUsecase } from 'src/usecases/delivery-note/delete-delivery-note.usecase';
import { GetDeliveryNoteByIdUsecase } from 'src/usecases/delivery-note/get-delivery-note-by-id.usecase';
import { GetDeliveryNotesUsecase } from 'src/usecases/delivery-note/get-delivery-notes.usecase';
import { DeliveryNoteDto } from './delivery-note.dto';
import {
  DeliveryNotePresenter,
  DeliveryNotePresenterNoProductItems,
} from './delivery-note.presenter';

@Controller('/delivery-notes')
@ApiTags('delivery notes')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class DeliveryNoteController {
  constructor(
    private readonly createDeliveryNoteUsecase: CreateDeliveryNoteUsecase,
    private readonly getDeliveryNotesUsecase: GetDeliveryNotesUsecase,
    private readonly getDeliveryNoteByIdUsecase: GetDeliveryNoteByIdUsecase,
    private readonly deleteDeliveryNoteUsecase: DeleteDeliveryNoteUsecase,
  ) {}

  @Post()
  @ApiBody({
    type: DeliveryNoteDto,
  })
  @ApiResponse({
    status: 201,
    type: DeliveryNotePresenter,
  })
  async createDeliveryNote(@Body() deliveryNoteDto: DeliveryNoteDto) {
    try {
      const createdDeliveryNote = await this.createDeliveryNoteUsecase.execute(
        deliveryNoteDto.providerId,
        deliveryNoteDto.date,
      );
      return DeliveryNotePresenter.fromDeliveryNoteEntity(createdDeliveryNote);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: DeliveryNotePresenterNoProductItems,
    isArray: true,
  })
  async getDeliveryNotes() {
    try {
      const deliveryNotes = await this.getDeliveryNotesUsecase.execute();
      return deliveryNotes.map((deliveryNote) =>
        DeliveryNotePresenterNoProductItems.fromDeliveryNoteEntity(
          deliveryNote,
        ),
      );
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: DeliveryNotePresenter,
  })
  async getDeliveryNote(@Param('id', new ParseIntPipe()) id: number) {
    try {
      const deliveryNote = await this.getDeliveryNoteByIdUsecase.execute(id);
      return DeliveryNotePresenter.fromDeliveryNoteEntity(deliveryNote);
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async deleteDeliveryNote(@Param('id', new ParseIntPipe()) id: number) {
    try {
      await this.deleteDeliveryNoteUsecase.execute(id);
    } catch (error) {
      HandleExeption(error);
    }
  }
}
