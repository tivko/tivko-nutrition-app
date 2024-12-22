import { Status } from './enums/status.enum';
import { UsersService } from 'src/users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealProgram } from './entity/meal-program.entity';
import { CreateMealProgramDto } from './dto/mealProgram.create.dto';
import { UpdateMealProgramDto } from './dto/mealProgram.update.dto';
import { Users } from 'src/users/entity/users.entity';

@Injectable()
export class MealProgramService {
  constructor(
    @InjectRepository(MealProgram)
    private mealPlanRepository: Repository<MealProgram>,
    private usersService: UsersService,
  ) {}

  async create(mealProgram: CreateMealProgramDto, id) {
    const user = await this.usersService.findUserById(id);
    const res = await this.mealPlanRepository.save({
      user: user,
      ...mealProgram,
    });
    return res;
  }

  async findActiveUserMealProgram(id) {
    const status = Status.TRYVAYE;
    return await this.findUserMealProgramByStatus(id, status);
  }

  async findActiveUserMealProgramByDate(id, date) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    const status = Status.TRYVAYE;
    const newDate = new Date('2024-06-07T00:00:00.000Z');

    const currentMealProgram = await this.mealPlanRepository
      .createQueryBuilder('mealProgram')
      .leftJoinAndSelect('mealProgram.user', 'user')
      .leftJoinAndSelect('mealProgram.dailyInfo', 'dailyInfo')
      .leftJoinAndSelect('dailyInfo.dailyDishes', 'dailyDishes')
      .leftJoinAndSelect('dailyDishes.dish', 'dish')
      .where('user.id = :id', { id })
      .andWhere('mealProgram.status = :status', { status })
      .andWhere('dailyInfo.date = :newDate', { newDate })
      .getOne();
    if (!currentMealProgram) {
      throw new NotFoundException('currentMealProgram не знайдено');
    }
    return currentMealProgram;
  }

  async findUserMealProgramByStatus(id, status: Status) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    const currentMealProgram = await this.mealPlanRepository
      .createQueryBuilder('mealProgram')
      .leftJoinAndSelect('mealProgram.user', 'user')
      .leftJoin('mealProgram.activityLevel', 'activityLevel')
      .leftJoin('mealProgram.goal', 'goal')
      .addSelect([
        'goal.coefficient',
        'goal.value',
        'activityLevel.coefficient',
      ])
      .where('user.id = :id', { id })
      .andWhere('mealProgram.status = :status', { status })
      .getMany();
    if (!currentMealProgram) {
      throw new NotFoundException('currentMealProgram не знайдено');
    }
    return currentMealProgram;
  }

  async findOne(id): Promise<MealProgram> {
    const res = await this.mealPlanRepository.findOne({ where: { id } });
    if (!res) {
      throw new NotFoundException('MealProgram не знайдено');
    }
    return res;
  }

  async findAllUserMealPrograms(id) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    const currentMealProgram = await this.mealPlanRepository
      .createQueryBuilder('mealProgram')
      .leftJoinAndSelect('mealProgram.user', 'user')
      .leftJoinAndSelect('mealProgram.activityLevel', 'activityLevel')
      .leftJoinAndSelect('mealProgram.goal', 'goal')
      .leftJoinAndSelect('mealProgram.dailyInfo', 'dailyInfo')
      .where('user.id = :id', { id })
      .getMany();

    if (!currentMealProgram) {
      throw new NotFoundException('currentMealProgram не знайдено');
    }
    return currentMealProgram;
  }

  async findMealProgramById(id) {
    const currentMealProgram = await this.mealPlanRepository
      .createQueryBuilder('mealProgram')
      .where('mealProgram.id = :id', { id })
      .getOne();

    if (!currentMealProgram) {
      throw new NotFoundException('MealProgram не знайдено');
    }
    return currentMealProgram;
  }

  async findMealProgramByIdWithDailyInfo(id: number) {
    const mealProgram = await this.mealPlanRepository
      .createQueryBuilder('mealProgram')
      .leftJoinAndSelect('mealProgram.activityLevel', 'activityLevel')
      .leftJoinAndSelect('mealProgram.goal', 'goal')
      .where('mealProgram.id = :id', { id })
      .getMany();

    console.log(mealProgram);
    if (!mealProgram) {
      throw new NotFoundException('MealProgram не знайдено');
    }
    return mealProgram;
  }

  async update(
    id: string,
    mealProgram: UpdateMealProgramDto,
  ): Promise<MealProgram> {
    const existingInfo = await this.findMealProgramById(id);
    if (!existingInfo) {
      throw new HttpException(`MealProgram не знайдено`, HttpStatus.NOT_FOUND);
    }
    Object.assign(existingInfo, mealProgram);
    return await this.mealPlanRepository.save(existingInfo);
  }

  async remove(id: string): Promise<void> {
    await this.mealPlanRepository.delete(id);
  }
}
