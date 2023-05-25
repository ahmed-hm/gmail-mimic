import { Body, Controller, Post } from '@nestjs/common';
import { CustomResponse, IsPublic } from 'src/shared';
import { SigninDto } from './dto/signin.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<CustomResponse<{ user: User; token: string }>> {
    const { user, token } = await this.userService.signin(signinDto);

    return new CustomResponse<{ user: User; token: string }>({
      payload: { data: { user, token } },
      message: 'User signed in successfully',
    });
  }
}
