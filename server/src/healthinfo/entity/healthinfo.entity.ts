import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsInt, Min, IsEnum, Max, IsNumber } from 'class-validator';
import { Gender } from 'src/healthinfo/enums/gender.enum';
import { Users } from 'src/users/entity/users.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';

@Entity()
export class HealthInfo extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt({ message: 'Вік повинен бути цілим числом' })
  @Min(18, { message: 'Невірний вік. Має бути не менше 18 років' })
  @Max(100, { message: 'Невірний вік. Має бути менше 100 років' })
  age: number;

  @Column({ type: 'float' })
  @IsNumber()
  @Min(10)
  @Max(800)
  weight: number;

  @Column({ type: 'float' })
  @IsNumber()
  @Min(50)
  @Max(300)
  height: number;

  @Column({ type: 'float', nullable: true })
  bodyfat: number | null;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  @IsEnum(Gender, { message: 'Неправильна стать' })
  gender: Gender;

  @OneToOne(() => Users, (user) => user.healthInfo)
  @JoinColumn()
  user: Users;
}
