import { IsEmail, IsString } from 'class-validator';
import { BaseEntity } from 'src/shared';

export class User extends BaseEntity {
  constructor(user: User) {
    super();
    Object.assign(this, user);
  }

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
