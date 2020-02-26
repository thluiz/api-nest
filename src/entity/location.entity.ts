import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
} from 'typeorm';
import { PersonLocation } from './person_location.entity';

@Entity({
  name: 'locations'
})
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 300,
  })
  name: string;
  
  @OneToMany(
    type => PersonLocation,
    pl => pl.location,
  )
  team: PersonLocation[];

  @Column()
  @Generated('uuid')
  uuid: string;
}
