import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from './constants';

@Injectable()
export class BcryptService {
  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, bcryptConstants.saltOrRounds);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
