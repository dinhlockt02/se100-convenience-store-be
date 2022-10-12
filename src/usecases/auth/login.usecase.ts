import { UnauthotizedException } from 'src/core/exceptions/auth.exception';
import { NotFoundException } from 'src/core/exceptions/bussiness.exception';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { IAuthTokenService } from 'src/core/services/auth-token.service';
import { IPasswordHasherService } from 'src/core/services/password-hasher.service';

export class LoginUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasherService: IPasswordHasherService,
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await this.passwordHasherService.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthotizedException('Password not match');
    }

    const token = await this.authTokenService.createToken({
      sub: existingUser.id,
    });

    return token;
  }
}
