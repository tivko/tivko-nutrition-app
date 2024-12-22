import { DeleteDailyDishDto } from './dto/daily-dish.delete.dto';
import { DailyInfoService } from './../daily-info/daily-info.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { DishService } from 'src/dish/dish.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { DailyDishes } from './entity/dailyDishes.entity';
import { CreateDailyDishDto } from './dto/daily-dish.create.dto';

@Injectable()
export class DailyDishesService {
  constructor(
    @InjectRepository(DailyDishes)
    private dailydishesRepository: Repository<DailyDishes>,
    private dailyInfoService: DailyInfoService,
    private dishService: DishService,
  ) {}

  async create(createDailyDishDto: CreateDailyDishDto) {
    const dailyInfo = await this.dailyInfoService.findOne(
      createDailyDishDto.dailyInfoId,
    );
    const dish = await this.dishService.findOneDishByID(
      createDailyDishDto.dishId,
    );

    return await this.dailydishesRepository.save({
      ...createDailyDishDto,
      dish,
      dailyInfo,
    });
  }

  async delete(createDailyDishDto: CreateDailyDishDto) {
    const dailyInfo = await this.dailyInfoService.findOne(
      createDailyDishDto.dailyInfoId,
    );
    const dish = await this.dishService.findOneDishByID(
      createDailyDishDto.dishId,
    );

    const res = await this.dailydishesRepository.findOne({
      where: {
        dishId: createDailyDishDto.dishId,
        dailyInfoId: createDailyDishDto.dailyInfoId,
        mealType: createDailyDishDto.mealType,
      },
    });

    if (!res) {
      throw new NotFoundException(`Страви (dailydishes) не знайдено`);
    }
    return await this.dailydishesRepository.remove(res);
  }

  async findOneByID(id) {
    const res = await this.dailydishesRepository.findOne({
      where: { id },
    });
    if (!res) {
      throw new NotFoundException(`Страви (dailydishes) з ${id} не знайдено`);
    }
    return res;
  }

  async remove(id) {
    const res = await this.findOneByID(id);
    if (!res) {
      throw new NotFoundException(`Страви (dailydishes) з ${id} не знайдено`);
    }
    return await this.dailydishesRepository.remove(res);
  }
}
