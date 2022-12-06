import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from '../user/user.presenter';

export class AuthPresenter {
  @ApiProperty({
    type: String,
  })
  access_token: string;
  @ApiProperty({
    type: UserPresenter,
  })
  user: UserPresenter;
}
