import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateIngredientCategoryDto } from './dto/ingredient-category.update.dto';
import { CreateIngredientCategoryDto } from './dto/ingredient-category.create.dto';
import { IngredientCategory } from './entity/ingredient-category.entity';

@Injectable()
export class IngredientCategoryService {
  constructor(
    @InjectRepository(IngredientCategory)
    private readonly ingredientCategoryRepository: Repository<IngredientCategory>,
  ) {}

  async create(
    createIngredientCategoryDto: CreateIngredientCategoryDto,
  ): Promise<IngredientCategory> {
    const ingredientCategory = this.ingredientCategoryRepository.create(
      createIngredientCategoryDto,
    );
    return this.ingredientCategoryRepository.save(ingredientCategory);
  }

  async findAll(): Promise<IngredientCategory[]> {
    return this.ingredientCategoryRepository.find();
  }

  async findOne(id: number): Promise<IngredientCategory> {
    const ingredientCategory = await this.ingredientCategoryRepository.findOne({
      where: { id },
    });
    if (!ingredientCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return ingredientCategory;
  }

  async update(
    id: number,
    updateIngredientCategoryDto: UpdateIngredientCategoryDto,
  ): Promise<IngredientCategory> {
    await this.ingredientCategoryRepository.update(
      id,
      updateIngredientCategoryDto,
    );
    const updatedCategory = await this.ingredientCategoryRepository.findOne({
      where: { id },
    });
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    const result = await this.ingredientCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
