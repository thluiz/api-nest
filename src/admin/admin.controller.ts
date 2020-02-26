import {
  Controller,
  Post,
  UseGuards,
  Req,
  Param,
  UnauthorizedException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../entity/user.entity';
import { Location } from '../entity/location.entity';
import { UsersService } from '../users/users.service';
import { AdminService } from './admin.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonLocation } from 'src/entity/person_location.entity';
import { Person } from 'src/entity/person.entity';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(AdminService) private adminService: AdminService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  @Post('/users/makeAdmin/:userId')
  @UseGuards(JwtAuthGuard)
  async makeAdmin(
    @Req() request,
    @Param('userId') userId: string,
  ): Promise<User> {
    this.validateUserIsAdmin(request.user);

    const user = await this.usersService.findOne(userId);
    return await this.usersService.makeAdmin(user);
  }

  @Post('/location/:name')
  @UseGuards(JwtAuthGuard)
  async addLocation(
    @Req() request,
    @Param('name') name: string,
  ): Promise<Location> {
    this.validateUserIsAdmin(request.user);

    return await this.adminService.addLocation(name);
  }

  @Post('/location/team/:locationId/:personId/:isOperator?/:isDirector?')
  @UseGuards(JwtAuthGuard)
  async addPersonToLocationTeam(
    @Req() request,
    @Param('locationId') locationId: number,
    @Param('personId') personId: number,
    @Param('isOperator') isOperator: number,
    @Param('isDirector') isDirector: number,    
  ): Promise<PersonLocation> {
    this.validateUserIsAdmin(request.user);

    const location = await this.locationsRepository.findOne(locationId);

    if(!location) {
        throw new BadRequestException("Location not found");
    }

    const person = await this.peopleRepository.findOne(personId);

    if(!person) {
        throw new BadRequestException("Person not found");
    }

    return await this.adminService.addPersonToLocationTeam(
        location, person, isDirector == 1, isOperator == 1
    );
  }

  private validateUserIsAdmin(user: User) {
    if (user.person.is_admin) {
      return;
    }

    throw new UnauthorizedException();
  }
}
