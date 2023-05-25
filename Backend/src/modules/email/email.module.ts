import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { emailModelName, emailSchemaFactory } from './schema/email.schema';

const EmailMongooseDynamicModule = MongooseModule.forFeature([{ name: emailModelName, schema: emailSchemaFactory() }]);

@Module({
  imports: [EmailMongooseDynamicModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailMongooseDynamicModule],
})
export class EmailModule {}
