import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, CustomResponse } from 'src/shared';
import { User } from '../user/entities/user.entity';
import { GetEmailDto } from './dto/get-email.dto';
import { GetEmailsDto } from './dto/get-emails.dto';
import { ReplyDto } from './dto/reply.dto';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';

@Controller('emails')
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('reply')
  @ApiBearerAuth()
  async reply(@Body() replyDto: ReplyDto, @AuthUser() user: User): Promise<CustomResponse<Email>> {
    const email = await this.emailService.reply(replyDto, user.email);

    return new CustomResponse<Email>({
      payload: { data: email },
      message: 'Email sent successfully',
    });
  }

  @Get()
  @ApiBearerAuth()
  async findAll(@Query() getEmailsDto: GetEmailsDto, @AuthUser() user: User): Promise<CustomResponse<Email[]>> {
    const payload = await this.emailService.findAll(getEmailsDto, user.email);

    return new CustomResponse<Email[]>({
      payload,
      message: 'Emails fetched successfully',
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param() getEmailDto: GetEmailDto, @AuthUser() user: User): Promise<CustomResponse<Email>> {
    const email = await this.emailService.findOne(getEmailDto, user.email);

    return new CustomResponse<Email>({
      payload: { data: email.toObject({ virtuals: ['reply'] }) },
      message: 'Email fetched successfully',
    });
  }
}
