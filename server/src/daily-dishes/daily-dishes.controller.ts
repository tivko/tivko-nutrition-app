import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { DailyDishesService } from './daily-dishes.service';
import { CreateDailyDishDto } from './dto/daily-dish.create.dto';
import { DeleteDailyDishDto } from './dto/daily-dish.delete.dto';
import { DailyDishes } from './entity/dailyDishes.entity';

@Controller('daily-dishes')
export class DailyDishesController {
  constructor(private readonly dailyDishesService: DailyDishesService) {}

  @Post()
  async create(
    @Body() createDailyDishDto: CreateDailyDishDto,
  ): Promise<DailyDishes> {
    return await this.dailyDishesService.create(createDailyDishDto);
  }

  @Delete()
  async deleteOne(
    @Body() createDailyDishDto: CreateDailyDishDto,
  ): Promise<DailyDishes> {
    return await this.dailyDishesService.delete(createDailyDishDto);
  }

  @Get('/:id')
  async findOneByID(@Param('id') id: number): Promise<DailyDishes> {
    const dailyDish = await this.dailyDishesService.findOneByID(id);
    if (!dailyDish) {
      throw new NotFoundException(`Страви (dailydish) з ID ${id} не знайдено`);
    }
    return dailyDish;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<any> {
    const res = await this.dailyDishesService.remove(id);
    return {
      status: true,
      result: res,
    };
  }
}
