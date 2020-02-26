import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Person } from 'src/entity/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Person])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
