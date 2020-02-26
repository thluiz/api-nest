import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [PresenceService],
  controllers: [PresenceController],
  imports: [UsersModule],
})
export class PresenceModule {}
