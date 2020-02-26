import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {
	OAuth2Strategy,
	IOAuth2StrategyOptionWithRequest,
	Profile,
	VerifyFunction
} from "passport-google-oauth";
import { Request } from "express";
import AuthService, { AuthProvider } from "./auth.service";
import ConfigService from "../config/config.service";


@Injectable()
export default class GoogleStrategy extends PassportStrategy(OAuth2Strategy, AuthProvider.GOOGLE) {
	public constructor(		
		@Inject(AuthService) authService: AuthService, 
		configService: ConfigService) {
		const options: IOAuth2StrategyOptionWithRequest & { scope: string | string[] } = {
			clientID: configService.GoogleOauth.ClientId,
			clientSecret: configService.GoogleOauth.ClientSecret,
			callbackURL: configService.GoogleOauth.CallbackUrl,
			passReqToCallback: true,
			scope: ["profile", "email"]
		};

		super(
			options,
			async (
				req: Request,
				accessToken: string,
				refreshToken: string,
				profile: Profile,
				done: VerifyFunction
			): Promise<void> => {				
				let user = await authService.findOrCreateUserFromGoogle(profile);
				
				done(undefined, user);
			}
		);
	}

	
}