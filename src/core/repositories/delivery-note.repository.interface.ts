import { IsString, IsDate, IsInt, Min } from 'class-validator';
import { DeliveryNoteEntity } from '../entities/delivery-note.entity';

export interface IDeliveryNoteRepository {
  createDeliveryNote(
    deliveryNote: DeliveryNoteEntity,
    createProductItemDtos: CreateProductItemDto[],
  ): Promise<DeliveryNoteEntity>;

  getDeliveryNotes(): Promise<DeliveryNoteEntity[]>;
  getDeliveryNoteById(id: number): Promise<DeliveryNoteEntity>;
  deleteDeliveryNoteById(id: number);
}

export class CreateProductItemDto {
  @IsString()
  productId: number;
  @IsDate()
  MFG: Date;
  @IsDate()
  EXP: Date;
  @IsInt()
  @Min(0)
  cost: number;
  @IsInt()
  @Min(0)
  price: number;
  @IsInt()
  @Min(0)
  quantity: number;
  @IsString()
  description: string;
  image: string;
}

export const IDeliveryNoteRepositoryLabel = 'IDeliveryNoteRepositoryLabel';
