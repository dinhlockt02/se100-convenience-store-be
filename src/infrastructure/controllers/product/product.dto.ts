import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsUrl } from 'class-validator';
import { ProductEntity } from 'src/core/entities/product.entity';

export class ProductDto {
  @ApiProperty({ required: true, example: 'Banh mi' })
  name: string;
  @ApiProperty({ required: true, minimum: 0 })
  price: number;
  @ApiProperty({ required: true, minimum: 0 })
  cost: number;
  @ApiProperty({ required: true, minimum: 0, maximum: 100, default: 10 })
  vat: number;
  @ApiProperty({ required: true, minimum: 0, example: 100 })
  amount: number;
  @ApiProperty({ required: true, example: 'Banh mi description' })
  description: string;
  @ApiProperty({ required: true, example: 'https://example.com/a.jpg' })
  @IsUrl({ require_tld: false })
  image: string;
  @ApiProperty({ required: true, minimum: 0, type: Date })
  @IsDateString()
  expireDate: string;

  static toEntity(createProductDto: ProductDto): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.name = createProductDto.name;
    productEntity.price = createProductDto.price;
    productEntity.cost = createProductDto.cost;
    productEntity.vat = createProductDto.vat;
    productEntity.amount = createProductDto.amount;
    productEntity.description = createProductDto.description;
    productEntity.expireDate = new Date(createProductDto.expireDate);
    productEntity.image = createProductDto.image;
    return productEntity;
  }
}
