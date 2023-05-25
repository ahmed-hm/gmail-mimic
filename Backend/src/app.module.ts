import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AuthModule } from './modules/auth/auth.module';
import { JWTGuard } from './modules/auth/jwt/jwt.guard';
import { EmailModule } from './modules/email/email.module';
import { EmailModel, emailModelName } from './modules/email/schema/email.schema';
import { UserModel, userModelName } from './modules/user/schema/user.schema';
import { UserModule } from './modules/user/user.module';
import { GlobalHandler } from './shared';
import * as seed from './shared/seed/seed.json';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create({ instance: { port: 4444 } });
        const uri = mongod.getUri();

        return { uri };
      },
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: GlobalHandler },
    { provide: APP_GUARD, useClass: JWTGuard },
  ],
})
export class AppModule {
  logger = new Logger(AppModule.name);
  constructor(
    @InjectModel(userModelName) private userModel: UserModel,
    @InjectModel(emailModelName) private emailModel: EmailModel,
  ) {
    this.seedData();
  }

  async seedData() {
    this.logger.log('starting seed');

    const users = seed.users.map(async (user) => await this.userModel.create(user));
    const emails = seed.emails.map(async (email) => await this.emailModel.create(email));

    await Promise.all([...users, ...emails]);
    this.logger.log('finished seed');
  }
}
