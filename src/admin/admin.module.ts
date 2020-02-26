import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Person } from 'src/entity/person.entity';
import { Location } from 'src/entity/location.entity';
import { PersonLocation } from 'src/entity/person_location.entity';


@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forFeature([
      User, Person, Location, PersonLocation
    ])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
