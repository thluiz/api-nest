import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
//import { User } from "../../user";

@Injectable()
export default class GoogleAuthGuard extends AuthGuard("google") {
	public canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		super.logIn(ctx.switchToHttp().getRequest());
		return super.canActivate(ctx);
	}

	// eslint-disable-next-line class-methods-use-this
	public handleRequest<U extends {} /*User */>(err: Error, user: U, info?: string): U {
		if (err !== undefined) {
			throw err;
		}

		if (user === undefined) {
			throw new UnauthorizedException();
		}

		return user;
	}
}