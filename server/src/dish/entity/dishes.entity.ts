import { IsNumber, IsString } from 'class-validator';
import { DailyDishes } from 'src/daily-dishes/entity/dailyDishes.entity';
import { DishCategory } from 'src/dish-category/entity/dish-category.entity';
import { DishIngredients } from 'src/dish-ingredients/entity/dish-ingredient.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dishes extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column({ nullable: true })
  @IsString()
  dish_photo: string;

  @Column({ nullable: true })
  @IsString()
  dish_video: string;

  @Column('float')
  @IsNumber()
  carbohydrates: number;

  @Column('float', { nullable: true })
  @IsNumber()
  calories: number;

  @Column('float', { nullable: true })
  @IsNumber()
  portion: number;

  @Column('float')
  @IsNumber()
  protein: number;

  @Column('float')
  @IsNumber()
  fat: number;

  @OneToMany(() => DishIngredients, (dishingredients) => dishingredients.dish)
  public dishingredients: DishIngredients[];

  @OneToMany(() => DailyDishes, (dailyDishes) => dailyDishes.dish)
  public dailyDishes: DailyDishes[];

  @ManyToMany(() => DishCategory)
  @JoinTable()
  categories: DishCategory[];

  @ManyToMany(() => Users, (users) => users.favoritedishes)
  users: Users[];
}
