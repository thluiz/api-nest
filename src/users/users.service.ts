import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, ObjectLiteral } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class UsersService {
	
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    private readonly connection: Connection
  ) {}

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {          
    return this.findBy( { email } );
  }

  async findByUuId(uuid: string): Promise<User | undefined> {          
    return this.findBy( { uuid } );
  }

  async findBy(where : ObjectLiteral): Promise<User | undefined> {          
    return this.usersRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.person", "people")
            .where(where)
            .getOne();
  }

  async createMinimalUser(name: string, email: string, google_photo?: string) : Promise<User> {    
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const person = new Person();
      person.name = name;
      person.google_photo = google_photo;
      await queryRunner.manager.save(person);

      const user = new User();
      user.email = email;
      user.person = person;

      await queryRunner.manager.save(user);
  
      await queryRunner.commitTransaction();

      return user;
    } catch (err) {      
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {      
      await queryRunner.release();
    }    
  }
  
  async makeAdmin(user: User) : Promise<User> {
    if(user.person.is_admin) {
      console.log("User already is admin!");
      return user;
    }

    user.person.is_admin = true;

    await this.peopleRepository.save(user.person);

    return user;
  }

  
}
