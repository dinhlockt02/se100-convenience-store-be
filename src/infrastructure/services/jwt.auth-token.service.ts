import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthTokenService } from 'src/core/services/auth-token.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthTokenService implements IAuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(payload: any): Promise<string> {
    const secret = this.configService.getOrThrow('JWT_SECRET');
    const expiresIn = this.configService.getOrThrow('JWT_EXPIRESIN');
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }
  async verify(token: string): Promise<any> {
    const decodedToken = await this.jwtService.verifyAsync(token);
    return decodedToken;
  }
}
