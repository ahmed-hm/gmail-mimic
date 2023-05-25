import { IsEmail, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BaseEntity, TransformObjectId } from 'src/shared';

export class Email extends BaseEntity {
  constructor(email: Email) {
    super();
    Object.assign(this, email);
    // this.from = this.from.replace(/^(.)(.*)(.@.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c);
  }

  @TransformObjectId()
  replyTo: Types.ObjectId;

  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
