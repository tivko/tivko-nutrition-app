import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from 'src/entity/abstract.entity';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';

@Entity()
export class IngredientCategory extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Ingredients, (ingredient) => ingredient.categories)
  ingredient: Ingredients[];
}
