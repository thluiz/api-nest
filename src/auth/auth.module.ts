import { Module } from '@nestjs/common';
//import { UserModule } from "../user";
import AuthService from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import AuthController from "./auth.controller";
import GoogleStrategy from './google.strategy';
import { ConfigModule } from '../config/config.module';
import ConfigService from 'src/config/config.service';

@Module({
	imports: [
		ConfigModule,
		//UserModule,
		PassportModule.register({ defaultStrategy: "google", property: "profile", session: true })
	],
	controllers: [AuthController],
	providers: [AuthService, GoogleStrategy, ConfigService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthModule {}
