import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { Dishes } from 'src/dish/entity/dishes.entity';
import { AbstractEntity } from 'src/entity/abstract.entity';
import { HealthInfo } from 'src/healthinfo/entity/healthinfo.entity';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
import { MealProgram } from 'src/mealProgram/entity/meal-program.entity';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users extends AbstractEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsString({ message: "Ім'я має бути рядком" })
  @MinLength(2, { message: "Ім'я закоротке" })
  @MaxLength(50, { message: "Ім'я задовге" })
  firstName: string;

  @Column()
  @IsString({ message: 'Прізвище має бути рядком' })
  @MinLength(2, { message: 'Прізвище закоротке' })
  @MaxLength(50, { message: 'Прізвище задовге' })
  lastName: string;

  @Column()
  @IsEmail({}, { message: 'Проблема з email' })
  email: string;

  @Column({ nullable: true })
  @IsString()
  profile: string;

  @Column({ nullable: true })
  token: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  @IsEnum(Role, { message: 'Неправильна роль' })
  roles: Role;

  @OneToOne(() => HealthInfo, (healthInfo) => healthInfo.user)
  healthInfo: HealthInfo;

  @ManyToMany(() => Ingredients)
  @JoinTable()
  allergies: Ingredients[];

  @ManyToMany(() => Dishes)
  @JoinTable()
  favoritedishes: Dishes[];

  @OneToMany(() => MealProgram, (mealProgram) => mealProgram.user)
  mealProgram: MealProgram[];
}
