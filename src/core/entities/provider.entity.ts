import {
  IsArray,
  IsEmail,
  IsInt,
  IsNumberString,
  IsString,
} from 'class-validator';
import { DeliveryNoteEntity } from './delivery-note.entity';
import { Entity } from './entity';
import { ProductEntity } from './product.entity';

export class ProviderEntity extends Entity {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
  @IsArray()
  products: ProductEntity[];
  @IsArray()
  deliveryNotes: DeliveryNoteEntity[];
  @IsNumberString()
  phone: string;
  @IsString()
  representative: string;

  constructor(
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    representative: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.products = [];
    this.deliveryNotes = [];
    this.phone = phone;
    this.representative = representative;
  }

  copyWith(
    name: string,
    address: string,
    email: string,
    phone: string,
    representative: string,
  ): ProviderEntity {
    return new ProviderEntity(
      this.id,
      name ?? this.name,
      address ?? this.address,
      email ?? this.email,
      phone ?? this.phone,
      representative ?? this.representative,
    );
  }
}
