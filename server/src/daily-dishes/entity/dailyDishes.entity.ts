import { IsEnum } from 'class-validator';
import { DailyInfo } from 'src/daily-info/entity/dailyInfo.entity';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK1 = 'morningSnack',
  SNACK2 = 'afternoonSnack',
}

@Entity()
export class DailyDishes extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dishId: number;

  @Column()
  dailyInfoId: number;

  @Column({
    type: 'enum',
    enum: MealType,
  })
  @IsEnum(MealType, { message: 'Неправильний MealType' })
  mealType: MealType;

  @ManyToOne(() => Dishes, (dish) => dish.dailyDishes)
  dish: Dishes;

  @ManyToOne(() => DailyInfo, (inf) => inf.dailyDishes)
  dailyInfo: DailyInfo;
}
