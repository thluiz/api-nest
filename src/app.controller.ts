import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AzureSessionStorageService } from './azure-session-storage/azure-session-storage.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("cleanUpSessions")
  async cleanUpSessions(): Promise<string> {

    let session = new AzureSessionStorageService({
      secret: process.env.EXPRESS_SESSION_KEY,
      resave: true,
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
      saveUninitialized: true
    });

    await session.cleanup();

    return this.appService.getHello() + ":: Cleaned UP!";
  }
}
