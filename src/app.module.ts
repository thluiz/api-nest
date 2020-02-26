import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpersModule } from './helpers/helpers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceModule } from './presence/presence.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import * as OrmConfig from "./config/orm";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(OrmConfig),
    HelpersModule,
    AuthModule,
    PresenceModule,
    UsersModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
