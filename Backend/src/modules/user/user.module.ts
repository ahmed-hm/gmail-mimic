import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelName, userSchemaFactory } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const UserMongooseDynamicModule = MongooseModule.forFeature([{ name: userModelName, schema: userSchemaFactory() }]);

@Module({
  imports: [UserMongooseDynamicModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserMongooseDynamicModule, UserService],
})
export class UserModule {}
