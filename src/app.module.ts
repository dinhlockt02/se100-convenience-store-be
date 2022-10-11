import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [GlobalModule, UsersModule, AuthModule],
})
export class AppModule {}
