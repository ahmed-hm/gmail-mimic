import { UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Model, Schema } from 'mongoose';
import { Email } from '../entities/email.entity';

export const emailModelName = Email.name;
export interface EmailModel extends Model<Email> {}
export function emailSchemaFactory() {
  const EmailSchema = new Schema<Email>(
    {
      from: { type: String, required: true, trim: true },
      to: { type: String, required: true, trim: true },
      subject: { type: String, default: '', trim: true },
      body: { type: String, default: '', trim: true },
      replyTo: { type: Schema.Types.ObjectId, ref: emailModelName },
    },
    {
      timestamps: true,
      toJSON: {
        transform: function (doc, ret) {
          // obsfucate email addresses
          ret.from = ret.from.replace(/^(.)(.*)(.@.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c);
        },
      },
    },
  );

  EmailSchema.virtual('reply', {
    ref: emailModelName,
    localField: '_id',
    foreignField: 'replyTo',
    justOne: true,
  });

  EmailSchema.pre('validate', async function () {
    const email = new Email(this.toObject());

    const validationErrors = await validate(email);

    if (validationErrors.length) {
      throw new UnprocessableEntityException({
        message: 'Input data validation failed',
        errors: JSON.stringify(validationErrors, null, 2),
      });
    }
  });

  return EmailSchema;
}
