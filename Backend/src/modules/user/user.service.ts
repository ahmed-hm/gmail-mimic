import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { User } from './entities/user.entity';
import { UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signin(signinDto: SigninDto): Promise<{ user: User; token: string }> {
    const user = await this.findUser(signinDto.email);
    await this.validatePassword(signinDto.password, user);

    const token = await this.generateToken(user);

    return { user, token };
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return user;
  }

  private async validatePassword(password: string, user: User): Promise<void> {
    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException({
        message: 'Invalid password',
      });
    }
  }

  private async generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { email: user.email, _id: user._id },
      { expiresIn: '1d', secret: this.configService.get<string>('JWT_SECRET_KEY') },
    );
  }
}
