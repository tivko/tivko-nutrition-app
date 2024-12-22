import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from 'src/entity/abstract.entity';
import { Dishes } from 'src/dish/entity/dishes.entity';

@Entity()
export class DishCategory extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Dishes)
  dish: Dishes[];
}
