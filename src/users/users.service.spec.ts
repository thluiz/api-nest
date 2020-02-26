import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should query users by email defined', async () => {    
    const result = ['test'];
    //jest.spyOn(UsersService, "findByEmail").mockImplementation(() => result);

    expect(await service.findByEmail("th.luiz@gmail.com")).toBe(result);
  });
});
