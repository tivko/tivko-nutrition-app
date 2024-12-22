import { IngredientCategoryService } from './../ingredient-category/ingredient-category.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Ingredients } from './entity/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import { UpdateIngredientDto } from './dto/ingredient.update.dto';
import { CreateIngredientDto } from './dto/ingredient.create.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredients)
    private ingredientInfoRepository: Repository<Ingredients>,
    private ingredientCategoryService: IngredientCategoryService,
  ) {}

  async create(ingredientInfo: CreateIngredientDto) {
    let existingTitleIngredient = await this.ingredientInfoRepository.findOne({
      where: { title: ingredientInfo.title },
    });

    if (existingTitleIngredient) {
      throw new HttpException(
        `Інгредієнт з такою назвою вже існує`,
        HttpStatus.CONFLICT,
      );
    }
    const res = await this.ingredientCategoryService.findOne(
      ingredientInfo.categories,
    );

    console.log(res);

    return await this.ingredientInfoRepository.save({
      ...ingredientInfo,
      categories: [res],
    });
  }

  async addCategory(
    ingredientId: number,
    categoryId: number,
  ): Promise<Ingredients> {
    const info = await this.ingredientInfoRepository.findOne({
      where: { id: ingredientId },
      relations: ['categories'],
    });

    if (!info) {
      throw new NotFoundException('Інгредієнт не знайдено');
    }

    const categories = await this.ingredientCategoryService.findOne(categoryId);

    if (!categories || categories == null) {
      throw new NotFoundException('Категорію не знайдено');
    }
    const categoryExists = info.categories.some((cat) => cat.id === categoryId);

    if (categoryExists) {
      throw new HttpException(
        'Категорія вже існує в інгредієнті',
        HttpStatus.CONFLICT,
      );
    }

    info.categories = [...info.categories, categories];
    return this.ingredientInfoRepository.save(info);
  }

  async deleteCategory(ingredientId, categoryId: number): Promise<Ingredients> {
    const info = await this.ingredientInfoRepository.findOne({
      where: { id: ingredientId },
      relations: ['categories'],
    });

    if (!info) {
      throw new NotFoundException('Інгредієнт не знайдено');
    }

    const category = await this.ingredientCategoryService.findOne(categoryId);

    if (!category || category == null) {
      throw new NotFoundException('Категорію не знайдено');
    }

    info.categories = info.categories.filter((el) => categoryId !== el.id);

    return this.ingredientInfoRepository.save(info);
  }

  async allIngredients() {
    const ingredients = await this.ingredientInfoRepository.find({
      relations: ['categories'],
    });
    if (!ingredients) {
      throw new NotFoundException(`Інгредієнтів не знайдено`);
    }
    return ingredients;
  }

  async findOneIngredientByID(id) {
    const ingredient = await this.ingredientInfoRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!ingredient) {
      throw new NotFoundException(`Інгредієнт з ${id} не знайдено`);
    }
    return ingredient;
  }

  async findOneIngredientByTytle(title) {
    const ingredient = await this.ingredientInfoRepository.findOne({
      where: { title },
    });
    if (!ingredient) {
      throw new NotFoundException(`Інгредієнт з назвою ${title}  не знайдено`);
    }
    return ingredient;
  }

  async update(
    id: number | string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredients> {
    const existingIngredient = await this.findOneIngredientByID(id);

    if (updateIngredientDto?.title) {
      let existingTitleIngredient = await this.findOneIngredientByTytle(
        updateIngredientDto.title,
      );
      if (
        existingTitleIngredient &&
        existingTitleIngredient?.title !== existingIngredient?.title
      ) {
        throw new HttpException(
          `Інгредієнт з такою назвою вже існує`,
          HttpStatus.CONFLICT,
        );
      }
    }

    Object.assign(existingIngredient, updateIngredientDto);
    return await this.ingredientInfoRepository.save(existingIngredient);
  }

  async remove(id) {
    const ingredient = await this.findOneIngredientByID(id);

    await this.ingredientInfoRepository.remove(ingredient);
    return {
      status: 200,
      message: `Інгредієнт з ${id} не знайдено`,
    };
  }

  async safeIngredients(allergyIds: number[]) {
    console.log(allergyIds);
    const ingredients = await this.ingredientInfoRepository.find({
      where: {
        id: Not(In(allergyIds)),
      },
      relations: ['categories'],
    });
    console.log(ingredients);
    return ingredients;
  }
}
