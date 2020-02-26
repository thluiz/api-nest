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
import bodyParser = require("body-parser");
import cors = require("cors");

import { AzureSessionStorageService } from './azure-session-storage/azure-session-storage.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  /* SESSION */
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


  /* CORS */
  app.enableCors(); 

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || (process.env.CORS_ALLOWED_ORIGINS.split(",") as any).includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  };

  app.use(cors(corsOptions));

  /* RATELIMIT */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  /* BODYPARSER */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /* PASSPORT */
  app.use(passport.initialize());

  await app.listen(process.env.port || process.env.PORT || 3200);
}
bootstrap();
