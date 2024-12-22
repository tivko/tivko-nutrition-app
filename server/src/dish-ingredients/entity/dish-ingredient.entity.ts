import { Dishes } from 'src/dish/entity/dishes.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DishIngredients extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  count: number;

  @Column({ nullable: true })
  unit_of_measurement: string | null;

  @Column()
  description: string;

  @ManyToOne(() => Dishes, (dish) => dish.dishingredients)
  public dish: Dishes;

  @ManyToOne(() => Ingredients, (ingredient) => ingredient.dishingredients)
  public ingredient: Ingredients;
}
