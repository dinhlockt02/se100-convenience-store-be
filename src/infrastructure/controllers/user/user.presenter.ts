import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role, UserEntity } from 'src/core/entities/user.entity';

export class UserPresenter {
  @ApiProperty({ required: true, example: 1 })
  id: number;
  @ApiProperty({ required: true, example: 'test@email.com' })
  email: string;
  @ApiProperty({ required: true, example: 'John Doe' })
  fullname: string;
  @ApiProperty({ required: true, type: Date })
  birthday: Date;
  @ApiProperty({ required: true, example: '11234567890' })
  identityNumber: string;
  @ApiProperty({ required: true, enum: Gender })
  gender: Gender;
  @ApiProperty({ required: true, example: '1234567890' })
  phoneNumber: string;
  @ApiProperty({ required: true, example: '100 Wall St' })
  address: string;
  @ApiProperty({ required: true, example: 'About your self' })
  other: string;
  @ApiProperty({ required: true, example: 'https://localhost/test.jpg' })
  avatar: string;
  @ApiProperty({ required: true, enum: Role })
  role: Role;
  @ApiProperty({ required: true })
  updatedAt: Date;
  @ApiProperty()
  active: boolean;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.fullname = userEntity.fullname;
    this.birthday = userEntity.birthday;
    this.identityNumber = userEntity.identityNumber;
    this.gender = userEntity.gender;
    this.phoneNumber = userEntity.phoneNumber;
    this.address = userEntity.address;
    this.other = userEntity.other;
    this.avatar = userEntity.avatar;
    this.role = userEntity.role;
    this.updatedAt = userEntity.updatedAt;
    this.active = userEntity.active;
  }
}
