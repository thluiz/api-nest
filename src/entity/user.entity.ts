import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Person } from './person.entity';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(
    type => Person,
    person => person.users,
    {
      eager: true,
    },
  )
  person: Person;

  @Column()
  @Generated('uuid')
  uuid: string;
}
