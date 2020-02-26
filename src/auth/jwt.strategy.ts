import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import AuthService  from './auth.service';
import { Request } from 'express';
import ConfigService from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.JwtKey,
        });
    }

    // tslint:disable-next-line:ban-types
    async validate(payload: { id: string }, done: Function) {   
        const user = await this.authService.validateUser(payload);
        if (!user && done) {
            return done(new UnauthorizedException(), false);
        }

        if(done) {
            done(null, user);
        }

        return user;
    }
}