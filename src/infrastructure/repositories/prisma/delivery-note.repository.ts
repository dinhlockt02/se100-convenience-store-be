import { Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import { IDeliveryNoteRepository } from 'src/core/repositories/delivery-note.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { DeliveryNoteConverter } from './delivery-note.converter';

@Injectable()
export class DeliveryNoteRepository implements IDeliveryNoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDeliveryNote(
    deliveryNote: DeliveryNoteEntity,
  ): Promise<DeliveryNoteEntity> {
    try {
      const createdDeliveryNote = await this.prisma.deliveryNote.create({
        data: DeliveryNoteConverter.toDeliveryNoteCreateInput(deliveryNote),
        include: {
          provider: true,
          creator: true,
        },
      });
      return DeliveryNoteConverter.toDeliveryNoteEntity(createdDeliveryNote);
    } catch (error) {
      console.log(error);
      throw new CoreException.DatabaseException(error);
    }
  }
  async getDeliveryNotes(): Promise<DeliveryNoteEntity[]> {
    const deliveryNotes = await this.prisma.deliveryNote.findMany({
      include: {
        provider: true,
        creator: true,
      },
    });
    return deliveryNotes.map((deliveryNote) =>
      DeliveryNoteConverter.toDeliveryNoteEntity(deliveryNote),
    );
  }
  async getDeliveryNoteById(id: number): Promise<DeliveryNoteEntity> {
    const deliveryNote = await this.prisma.deliveryNote.findUnique({
      where: {
        id,
      },
      include: {
        provider: true,
        creator: true,
      },
    });
    return DeliveryNoteConverter.toDeliveryNoteEntity(deliveryNote);
  }
  async deleteDeliveryNoteById(id: number) {
    await this.prisma.deliveryNote.delete({
      where: {
        id,
      },
    });
  }
}
