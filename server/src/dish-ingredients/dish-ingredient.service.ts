import { IngredientService } from 'src/ingredient/ingredient.service';
import { DishService } from 'src/dish/dish.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { DishIngredients } from './entity/dish-ingredient.entity';
import { CreateDishIngredientDto } from './dto/dish-ingredients.create.dto';
import { UpdateDishIngredientDto } from './dto/dish-ingredients.update.dto';
import { DeleteDishIngredientDto } from './dto/dish-ingredients.delete.dto';

@Injectable()
export class DishIngredientService {
  constructor(
    @InjectRepository(DishIngredients)
    private dishIngredientRepository: Repository<DishIngredients>,
    private dishService: DishService,
    private ingredientService: IngredientService,
  ) {}

  async create(createDishIngredientDto: CreateDishIngredientDto) {
    const res = await this.checkIsExistDishAndIngredient(
      createDishIngredientDto.dish,
      createDishIngredientDto.ingredient,
    );
    console.log(res);
    if (!res) {
      throw new HttpException(`Інгредієнт знайдено`, HttpStatus.CONFLICT);
    }

    return await this.dishIngredientRepository.save({
      ...createDishIngredientDto,
      dish: res.dish,
      ingredient: res.ingredient,
    });
  }

  async checkIsExistDishAndIngredient(
    dishEl: number,
    ingredientEl: number,
    checkforCreate = true,
  ): Promise<any> {
    try {
      const dish = await this.dishService.findOneDishByID(dishEl);
      const ingredient =
        await this.ingredientService.findOneIngredientByID(ingredientEl);
      if (dish && ingredient) {
        const dishIngredients = await this.dishIngredientRepository.findOne({
          where: {
            dish: {
              id: dish.id,
            },
            ingredient: {
              id: ingredient.id,
            },
          },
          relations: ['dish', 'ingredient'],
        });
        console.log(dishIngredients);
        if (dishIngredients && !checkforCreate) {
          throw new HttpException(`Інгредієнт знайдено`, HttpStatus.CONFLICT);
        } else {
          return { dishIngredients, dish, ingredient };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    updateDishDto: UpdateDishIngredientDto,
  ): Promise<DishIngredients> {
    const { dish, ingredient, ...updateData } = updateDishDto;

    const res = await this.checkIsExistDishAndIngredient(
      dish,
      ingredient,
      false,
    );
    if (!res) {
      throw new HttpException(`Сталася помилка`, HttpStatus.CONFLICT);
    }
    Object.assign(res.dishIngredients, updateData);
    return await this.dishIngredientRepository.save(res.dishIngredients);
  }

  async remove(deleteDishIngredientDto: DeleteDishIngredientDto) {
    const dishIngredients = await this.dishIngredientRepository.findOne({
      where: {
        dish: {
          id: deleteDishIngredientDto.dish,
        },
        ingredient: {
          id: deleteDishIngredientDto.ingredient,
        },
      },
      relations: ['dish', 'ingredient'],
    });
    if (!dishIngredients) {
      throw new HttpException(`Даних за запитом не існує`, HttpStatus.CONFLICT);
    }

    return await this.dishIngredientRepository.remove(dishIngredients);
  }
}
