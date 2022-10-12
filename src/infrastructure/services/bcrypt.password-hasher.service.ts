import { Injectable } from '@nestjs/common';
import { IPasswordHasherService } from 'src/core/services/password-hasher.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptPasswordHasherService implements IPasswordHasherService {
  constructor(private readonly configService: ConfigService) {}

  async hash(plainString: string): Promise<string> {
    const saltRound = parseInt(
      this.configService.get<string>('BCRYPT_SALT_ROUND', '10'),
    );

    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(plainString, salt);
  }
  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
