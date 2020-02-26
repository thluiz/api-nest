import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';

import ConfigService from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import GoogleStrategy from './google.strategy';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		ConfigModule,		
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.JWTKey,
			signOptions: { expiresIn: '360000s' },
		}),
		UsersModule,
		ConfigModule
	],
	controllers: [AuthController],
	providers: [AuthService, GoogleStrategy, ConfigService, JwtStrategy]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthModule {}
