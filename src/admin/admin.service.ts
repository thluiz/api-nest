import { Injectable } from '@nestjs/common';
import { Location } from '../entity/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository, Connection } from 'typeorm';
import { Person } from 'src/entity/person.entity';
import { PersonLocation } from 'src/entity/person_location.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    @InjectRepository(PersonLocation)
    private readonly peopleLocationsRepository: Repository<PersonLocation>,
    private readonly connection: Connection,
  ) {}

  async addLocation(name: string): Promise<Location> {
    let location = await this.locationsRepository.findOne({ name });
    if (location) {
      console.log('Location already exists!');
      return location;
    }
    location = new Location();
    location.name = name;

    return await this.locationsRepository.save(location);
  }

  async addPersonToLocationTeam(
    location: Location,
    person: Person,
    isDirector: boolean,
    isOperator: boolean,
  ): Promise<PersonLocation> {
    let personLocation = await this.peopleLocationsRepository
      .createQueryBuilder('pl')
      .where('pl.location = :location and pl.person = :person ', {
        location: location.id,
        person: person.id,
      })
      .getOne();

    if (!personLocation) {
      personLocation = new PersonLocation();
      personLocation.location = location;
      personLocation.person = person;
    }

    personLocation.is_director = isDirector;
    personLocation.is_operator = isOperator || isDirector;

    return await this.peopleLocationsRepository.save(personLocation);
  }
}
