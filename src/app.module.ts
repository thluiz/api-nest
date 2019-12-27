import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  
