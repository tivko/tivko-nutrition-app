import { BMICategory } from './../enums/bmicategory.enum';
import { Column, Entity } from 'typeorm';
import { AbstractAdditionalEntity } from './abstractadditionalentity';
import { IsEnum } from 'class-validator';

@Entity()
export class Goal extends AbstractAdditionalEntity {
  @Column({ type: 'float', nullable: true })
  coefficient: number | null;

  @Column({ type: 'float', nullable: true })
  value: number | null;

  @Column({ type: 'float', nullable: true })
  weightChangePerWeek: number | null;

  @Column({
    type: 'simple-enum',
    enum: BMICategory,
    array: true,
    nullable: true,
  })
  @IsEnum(BMICategory, { each: true, message: 'Неправильна категорія' })
  bmiCategory: BMICategory[];
}
