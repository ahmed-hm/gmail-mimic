import { PickType } from '@nestjs/swagger';
import { User } from './user.entity';

export class JwtPayload extends PickType(User, ['_id', 'email']) {}
