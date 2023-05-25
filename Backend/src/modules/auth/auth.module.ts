import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JWTGuard } from './jwt/jwt.guard';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [JWTGuard, JWTStrategy],
  exports: [JWTGuard],
})
export class AuthModule {}
