import { IsNumber, IsString } from 'class-validator';
import { DailyDishes } from 'src/daily-dishes/entity/dailyDishes.entity';
import { DishIngredients } from 'src/dish-ingredients/entity/dish-ingredient.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
import { MealProgram } from 'src/mealProgram/entity/meal-program.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DailyInfo extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  date: Date;

  @Column('float')
  @IsNumber()
  dailyCarbohydrates: number;

  @Column('float')
  @IsNumber()
  dailyProteins: number;

  @Column('float', { nullable: true })
  @IsNumber()
  dailyCalories: number | null;

  @Column('float')
  @IsNumber()
  dailyFat: number;

  @Column({ nullable: true })
  @IsNumber()
  mealsNumber?: number | null;

  @Column('float')
  @IsNumber()
  currentWeight: number;

  @ManyToOne(() => MealProgram, (mealProgram) => mealProgram.dailyInfo)
  mealProgram: MealProgram;

  @OneToMany(() => DailyDishes, (dailyDishes) => dailyDishes.dailyInfo)
  dailyDishes: DailyDishes[];
}
