import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Profile } from 'passport-google-oauth';
import ConfigService from '../config/config.service';

export enum AuthProvider {
  GOOGLE = 'google',
}

@Injectable()
export default class AuthService {
  
  public constructor( 
    @Inject(UsersService) private usersService: UsersService, 
    @Inject(ConfigService) private configService: ConfigService) {
	  
  }


  async validateUser(payload: { id: string }): Promise<any> {
    return await this.usersService.findByUuId(payload.id);
  }

  async findOrCreateUserFromGoogle(profile: Profile) {
		let user = await this.usersService.findByEmail(profile.emails[0].value);
		if (user === undefined) {
			user = await this.usersService.createMinimalUser(profile.displayName, profile.emails[0].value, profile.photos[0].value);
		}
		return user;
	}
}
