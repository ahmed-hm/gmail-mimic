import { SendEmailCommand, SESClient, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CustomResponsePayload } from 'src/shared';
import { GetEmailDto } from './dto/get-email.dto';
import { GetEmailsDto } from './dto/get-emails.dto';
import { ReplyDto } from './dto/reply.dto';
import { Email } from './entities/email.entity';
import { EmailModel } from './schema/email.schema';

@Injectable()
export class EmailService {
  private sesClient: SESClient;
  constructor(@InjectModel(Email.name) private emailModel: EmailModel, private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const endpoint = this.configService.get<string>('AWS_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    this.sesClient = new SESClient({
      region,
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async reply(replyDto: ReplyDto, email: string): Promise<HydratedDocument<Email>> {
    const emailRepliedTo = await this.findOne({ id: replyDto.replyTo }, email);

    await this.ensureEmailHasNotBeenRepliedTo(emailRepliedTo);

    await this.sendEmail({
      from: emailRepliedTo.to,
      to: emailRepliedTo.from,
      subject: replyDto.subject,
      body: replyDto.body,
    });

    return this.emailModel.create({ ...replyDto, from: email, to: emailRepliedTo.from });
  }

  private async ensureEmailHasNotBeenRepliedTo(emailRepliedTo: Email) {
    const hasBeenRepliedTo = await this.emailModel.exists({ replyTo: emailRepliedTo._id });

    if (hasBeenRepliedTo) {
      throw new NotFoundException({
        message: 'Email has already been replied to',
      });
    }
  }

  async findAll(
    { limit, page }: GetEmailsDto,
    email: string,
  ): Promise<CustomResponsePayload<HydratedDocument<Email>[]>> {
    const [emails, total] = await Promise.all([
      this.emailModel
        .find({ to: email })
        .limit(limit)
        .skip((page - 1) * limit),
      this.emailModel.countDocuments(),
    ]);

    return {
      data: emails,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne({ id: _id }: GetEmailDto, email: string): Promise<HydratedDocument<Email>> {
    const result = await this.emailModel.findOne({ _id, to: email }).populate('reply');

    if (!result) {
      throw new NotFoundException({
        message: 'Email not found',
      });
    }

    return result;
  }

  private async sendEmail({ from, to, subject, body }: Pick<Email, 'body' | 'from' | 'subject' | 'to'>) {
    const command = new SendEmailCommand({
      Destination: { ToAddresses: [to] },
      Message: {
        Body: { Text: { Charset: 'UTF-8', Data: body } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: from,
    });

    await this.verifyEmail(from);

    return await this.sesClient.send(command);
  }

  private async verifyEmail(email: string) {
    const command = new VerifyEmailIdentityCommand({ EmailAddress: email });

    return await this.sesClient.send(command);
  }
}
