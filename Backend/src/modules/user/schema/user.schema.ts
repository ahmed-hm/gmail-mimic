import { UnprocessableEntityException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { Model, Schema } from 'mongoose';
import { User } from '../entities/user.entity';

export const userModelName = User.name;
export interface UserModel extends Model<User> {}
export function userSchemaFactory() {
  const userSchema = new Schema<User>(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
    },
    { timestamps: true },
  );

  userSchema.pre('validate', async function () {
    const user = new User(this.toObject());

    const validationErrors = await validate(user);

    if (validationErrors.length) {
      throw new UnprocessableEntityException({
        message: 'Input data validation failed',
        errors: JSON.stringify(validationErrors, null, 2),
      });
    }

    if (this.isNew) {
      this.password = await hash(user.password, 10);
    }
  });

  return userSchema;
}
