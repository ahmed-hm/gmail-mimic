import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/modules/user/entities/jwt-payload.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate({ email }: JwtPayload): Promise<User> {
    try {
      return this.userService.findUser(email);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid token',
        errors: { token: 'Invalid token' },
      });
    }
  }
}
