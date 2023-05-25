import { PickType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TransformObjectId } from 'src/shared';
import { Email } from '../entities/email.entity';

export class ReplyDto extends PickType(Email, ['subject', 'body']) {
  @TransformObjectId()
  replyTo: Types.ObjectId;
}
