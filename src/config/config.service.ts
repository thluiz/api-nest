import { Injectable } from '@nestjs/common';

@Injectable()
export default class ConfigService {
    GoogleOauth  = {
        ClientId: process.env.GOOGLE_CLIENT_ID,
        ClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        CallbackUrl: process.env.GOOGLE_CALLBACK_URL
    }    
}
