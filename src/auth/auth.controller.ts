import { Request, Response, NextFunction } from "express";
import { Controller, Logger, UseGuards, Post, Get, Req, Query, Res, Next, Param, UnauthorizedException, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';

import { authenticate } from "passport";

import { AuthProvider } from "./auth.service";

@Controller("auth")
export default class AuthController {
	
	public constructor(
		private readonly jwtService: JwtService) {		
	}

	@Get(':provider(google|facebook)/login')
	@UseGuards(AuthGuard(AuthProvider.GOOGLE))
	// eslint-disable-next-line class-methods-use-this, no-empty-function
	public googleLogin(): void {}
	
	@Get(':provider(google|facebook)/callback')	
	// eslint-disable-next-line class-methods-use-this
	async googleLoginCallback(
		@Req() req: Request,
		@Res() res: Response,
		@Next() next: NextFunction,
		@Param('provider') provider: AuthProvider
	) {

		const params = {
			session: true,
			state: req.query.state
		  };
	  		  
		  authenticate(provider, params, async (err, user) => {
			if (err) return next(err);
			if (!user) return next(new UnauthorizedException());

			const token = this.jwtService.sign({ id: user.uuid, email: user.email, name: user.person.name });	
			return res.status(HttpStatus.OK).json(token);

		  })(req, res, next);
	}
}