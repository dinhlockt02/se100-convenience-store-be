import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  CreateProductItemDto,
  IDeliveryNoteRepository,
} from 'src/core/repositories/delivery-note.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { DeliveryNoteConverter } from './delivery-note.converter';

@Injectable()
export class DeliveryNoteRepository implements IDeliveryNoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDeliveryNote(
    deliveryNote: DeliveryNoteEntity,
    createProductItemDtos: CreateProductItemDto[],
  ): Promise<DeliveryNoteEntity> {
    try {
      const createdDeliveryNote = await this.prisma.$transaction(async (tx) => {
        const dn = await tx.deliveryNote.create({
          data: DeliveryNoteConverter.toDeliveryNoteCreateInput(deliveryNote),
        });
        await tx.productItem.createMany({
          data: [
            ...createProductItemDtos.map((dto) =>
              DeliveryNoteConverter.toProductItemCreateInput(dto, dn.id),
            ),
          ],
        });
        return await tx.deliveryNote.findUnique({
          where: {
            id: dn.id,
          },
          include: {
            provider: true,
            creator: true,
          },
        });
      });
      return DeliveryNoteConverter.toDeliveryNoteEntity(createdDeliveryNote);
    } catch (error) {
      if (error.code == 'P2003') {
        throw new CoreException.NotFoundException('Product Item not found');
      }
      throw new CoreException.DatabaseException(error);
    }
  }
  async getDeliveryNotes(): Promise<DeliveryNoteEntity[]> {
    const deliveryNotes = await this.prisma.deliveryNote.findMany({
      include: {
        provider: true,
        creator: true,
      },
      orderBy: {
        date: 'desc',
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
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.productItem.deleteMany({
          where: {
            deliveryNoteId: id,
          },
        });
        await tx.deliveryNote.delete({
          where: {
            id,
          },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2003') {
          throw new CoreException.ConflictException(
            'Product item has been used.',
          );
        }
      }
      throw new CoreException.DatabaseException(error);
    }
  }
}
