import { Inject, Injectable } from '@nestjs/common';
import { CoreException } from 'src/core/exceptions';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';
import {
  IAuthTokenService,
  IAuthTokenServiceLabel,
} from 'src/core/services/auth-token.service';
import {
  IPasswordHasherService,
  IPasswordHasherServiceLabel,
} from 'src/core/services/password-hasher.service';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasherServiceLabel)
    private readonly passwordHasherService: IPasswordHasherService,
    @Inject(IAuthTokenServiceLabel)
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new CoreException.UnauthotizedException(
        'Email or password not match',
      );
    }

    const isPasswordMatch = await this.passwordHasherService.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      throw new CoreException.UnauthotizedException(
        'Email or password not match',
      );
    }

    const token = await this.authTokenService.createToken({
      sub: existingUser.id,
    });

    return token;
  }
}
