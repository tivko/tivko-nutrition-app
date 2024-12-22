import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishCategory } from './entity/dish-category.entity';
import { CreateDishCategoryDto } from './dto/dish-category.create.dto';
import { UpdateDishCategoryDto } from './dto/dish-category.update.dto';

@Injectable()
export class DishCategoryService {
  constructor(
    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,
  ) {}

  async create(
    createDishCategoryDto: CreateDishCategoryDto,
  ): Promise<DishCategory> {
    const existingCategory = await this.dishCategoryRepository.findOne({
      where: { name: createDishCategoryDto.name },
    });
    if (existingCategory) {
      throw new HttpException(
        `Категорія з вказаною назвою вже існує`,
        HttpStatus.CONFLICT,
      );
    }
    const dishCategory = this.dishCategoryRepository.create(
      createDishCategoryDto,
    );
    return this.dishCategoryRepository.save(dishCategory);
  }

  async findAll(): Promise<DishCategory[]> {
    return this.dishCategoryRepository.find();
  }

  async findOne(id: number): Promise<DishCategory> {
    const dishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });
    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }
    return dishCategory;
  }

  async update(
    id: number,
    updateDishCategoryDto: UpdateDishCategoryDto,
  ): Promise<DishCategory> {
    await this.dishCategoryRepository.update(id, updateDishCategoryDto);
    const updatedDishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });
    if (!updatedDishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }
    return updatedDishCategory;
  }

  async remove(id: number): Promise<void> {
    const result = await this.dishCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }
  }
}
