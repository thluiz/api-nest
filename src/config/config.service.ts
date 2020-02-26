import { Injectable } from '@nestjs/common';

@Injectable()
export default class ConfigService {
    BaseUrl = process.env.BaseURL;
    JwtKey = process.env.JWTKey;

    GoogleOauth  = {
        ClientId: process.env.GOOGLE_CLIENT_ID,
        ClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        CallbackUrl: process.env.GOOGLE_CALLBACK_URL
    }

    Azure = {
        Storage: {
            Name: process.env.AZURE_STORAGE_NAME,
            AccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
        }
    }

    Database = {
        DatabaseName: process.env.SQL_DATABASE,
        Host: process.env.SQL_HOST,
        UserName: process.env.SQL_USER,
        Password: process.env.SQL_PASSWORD
    }
}
