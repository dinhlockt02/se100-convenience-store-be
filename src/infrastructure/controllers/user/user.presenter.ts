import { UserEntity } from 'src/core/entities/user.entity';

export class UserPresenter {
  id: number;
  email: string;
  fullname: string;
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.fullname = userEntity.fullname;
  }
}
