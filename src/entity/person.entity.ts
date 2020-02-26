import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
} from 'typeorm';
import { User } from './user.entity';
import { PersonLocation } from './person_location.entity';

@Entity({
  name: 'people'
})
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 300,
  })
  name: string;

  @Column({
    nullable: true,
  })
  admission_date: Date;

  @Column({
    length: 20,
    nullable: true,
  })
  kf_name: string;

  @Column({
    length: 50,
    nullable: true,
  })
  kf_name_transcript: string;

  @Column({
    length: 500,
    nullable: true,
  })
  google_photo: string;

  @OneToMany(
    type => User,
    user => user.person,
  )
  users: User[];

  @OneToMany(
    type => PersonLocation,
    pl => pl.person,
  )
  locations: PersonLocation[];

  @Column()
  @Generated('uuid')
  uuid: string;
}
