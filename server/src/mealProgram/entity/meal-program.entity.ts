import { ActivityLevel } from 'src/additionalData/entities/activitylevel.enity';
import { Goal } from 'src/additionalData/entities/goal.enity';
import { DailyInfo } from 'src/daily-info/entity/dailyInfo.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { IsEnum } from 'class-validator';

@Entity()
export class MealProgram extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  requiredCalories: number;

  @Column({ type: 'float' })
  requiredFat: number;

  @Column({ type: 'float' })
  requiredCarbohydrates: number;

  @Column({ type: 'float' })
  requiredProteins: number;

  @ManyToOne(() => Goal, { nullable: false })
  @JoinColumn()
  goal: Goal;

  @ManyToOne(() => ActivityLevel, { nullable: false })
  @JoinColumn()
  activityLevel: ActivityLevel;

  @Column({ type: 'float' })
  macroSplitDietCarbs: number;

  @Column({ type: 'float' })
  macroSplitDietFat: number;

  @Column({ type: 'float' })
  macroSplitDietProtein: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date | null;

  @Column({ nullable: true })
  actualEndDate: Date | null;

  @Column({ type: 'float' })
  startWeight: number;

  @Column({ type: 'float', nullable: true })
  expectedWeight: number | null;

  @ManyToOne(() => Users, (user) => user.mealProgram)
  user: Users;

  @OneToMany(() => DailyInfo, (dailyInfo) => dailyInfo.mealProgram)
  dailyInfo: DailyInfo[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TRYVAYE,
  })
  @IsEnum(Status, { message: 'Неправильний статус' })
  status: Status;
}
