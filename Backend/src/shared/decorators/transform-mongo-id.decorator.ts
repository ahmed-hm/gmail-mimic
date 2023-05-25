import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';

export function TransformObjectId() {
  return Transform(({ obj, key }: TransformFnParams) => {
    if (!isMongoId(obj[key])) {
      throw new BadRequestException({
        message: 'Invalid ObjectId',
        errors: 'Invalid ObjectId',
      });
    }

    return new Types.ObjectId(obj[key]);
  });
}
