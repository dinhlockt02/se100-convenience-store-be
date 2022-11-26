import { IsArray, IsEmail, IsInt, IsString } from 'class-validator';
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

  constructor(id: number, name: string, address: string, email: string) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.products = [];
    this.deliveryNotes = [];
  }

  copyWith(name: string, address: string, email: string): ProviderEntity {
    return new ProviderEntity(
      this.id,
      name ?? this.name,
      address ?? this.address,
      email ?? this.email,
    );
  }
}
