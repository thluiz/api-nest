if (process.env.PRODUCTION != "true") {    
  require("dotenv").config( { path: require('path').resolve(__dirname, '../.env')});
} else {
  require('dotenv').config({ path: process.env.CONFIG_FILE });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';
import * as passport from 'passport';
import { AzureSessionStorageService } from './azure-session-storage/azure-session-storage.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.use(
    session({
      secret: process.env.EXPRESS_SESSION_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true
      },
      store: new AzureSessionStorageService({
        secret: process.env.EXPRESS_SESSION_KEY,
        resave: true,
        maxAge: 6 * 60 * 60 * 1000, // 6 hours
        saveUninitialized: true
      })
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
