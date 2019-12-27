import { Controller, Logger, UseGuards, Post, Get, Req, Query } from "@nestjs/common";
import AuthService, { AuthProvider } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { IncomingMessage } from "http";
import { Request } from "express";
import GoogleStrategy from "./google.strategy";

@Controller("auth")
export default class AuthController {
	private static readonly logger = new Logger(AuthController.name);
	private readonly authService: AuthService;
	private readonly googleStrategy: GoogleStrategy;

	public constructor(authService: AuthService, googleStrategy: GoogleStrategy) {
		this.authService = authService;
		this.googleStrategy = googleStrategy;
	}

	@Get("google/login")
	@UseGuards(AuthGuard(AuthProvider.GOOGLE))
	// eslint-disable-next-line class-methods-use-this, no-empty-function
	public googleLogin(): void {}

	@Get("google/callback")
	// eslint-disable-next-line class-methods-use-this
	public googleLoginCallback(@Req() request: IncomingMessage, @Query("code") code: string): string {
		return code;
	}
}