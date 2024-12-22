import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
require('dotenv').config();
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
