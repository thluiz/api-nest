import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Location } from './location.entity';
import { Person } from './person.entity';

@Entity({
  name: 'people_locations'
})
export class PersonLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  is_operator: boolean;

  @Column({
    default: false,
  })
  is_director: boolean;
  
  @ManyToOne(
    type => Location,
    l => l.team,
  )
  location: Location;

  @ManyToOne(
    type => Person,
    p => p.locations,
  )
  person: Person;

}
