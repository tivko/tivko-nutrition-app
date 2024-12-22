import { IsNumber, IsString } from 'class-validator';
import { DishIngredients } from 'src/dish-ingredients/entity/dish-ingredient.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { IngredientCategory } from 'src/ingredient-category/entity/ingredient-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ingredients extends AbstractEntity {
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
  ingredient_photo: string;

  @Column('float')
  @IsNumber()
  carbohydrates: number;

  @Column('float')
  @IsNumber()
  protein: number;

  @Column('float')
  @IsNumber()
  fat: number;

  @Column('float', { nullable: true })
  @IsNumber()
  calories: number;

  @OneToMany(
    () => DishIngredients,
    (dishingredients) => dishingredients.ingredient,
  )
  public dishingredients: DishIngredients[];

  @ManyToMany(() => IngredientCategory, (category) => category.ingredient)
  @JoinTable()
  categories: IngredientCategory[];
}
