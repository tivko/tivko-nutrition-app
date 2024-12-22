import { DishCategoryService } from './../dish-category/dish-category.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dishes } from './entity/dishes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDishDto } from './dto/dish.update.dto';
import { CreateDishDto } from './dto/dish.create.dto';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dishes)
    private dishRepository: Repository<Dishes>,
    private dishCategoryService: DishCategoryService,
  ) {}

  async create(dishInfo: CreateDishDto) {
    const { title } = dishInfo;

    // Check if there is already a dish with the same title
    const existingDishWithTitle = await this.dishRepository.findOne({
      where: { title },
    });
    if (existingDishWithTitle) {
      throw new HttpException(
        `Страва з такою назвою вже існує`,
        HttpStatus.CONFLICT,
      );
    }
    return await this.dishRepository.save(dishInfo);
  }

  async allDishes() {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishingredients', 'dishingredients')
      .leftJoinAndSelect('dish.categories', 'dishcategory')
      .leftJoinAndSelect('dishingredients.ingredient', 'ingredients')
      .leftJoinAndSelect('ingredients.categories', 'ingredientcategory')
      .getMany();
    if (!dish) {
      throw new NotFoundException(`Страви не знайдено`);
    }
    return dish;
  }

  async allUserFavDishes(id) {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishingredients', 'dishingredients')
      .leftJoinAndSelect('dishingredients.ingredient', 'ingredients')
      .leftJoinAndSelect('ingredients.categories', 'ingredientcategory')
      .leftJoinAndSelect('dish.users', 'users')
      .where('users.id = :id', { id })
      .getMany();
    if (!dish) {
      throw new NotFoundException(`Страви не знайдено`);
    }
    return dish;
  }

  async findOneDishByID(id) {
    const dish = await this.dishRepository.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException(`Страву з ${id} не знайдено`);
    }
    return dish;
  }

  async update(updateDishDto: UpdateDishDto): Promise<Dishes> {
    const { id, title, ...updateData } = updateDishDto;

    // Check if the dish to be updated exists
    const dish = await this.findOneDishByID(id);
    if (!dish) {
      throw new NotFoundException(`Dish with id ${id} not found`);
    }

    // Check if there is another dish with the same title
    if (title) {
      const existingDishWithTitle = await this.dishRepository.findOne({
        where: { title },
      });
      if (existingDishWithTitle && existingDishWithTitle.id !== id) {
        throw new HttpException(
          `Страва з такою назвою вже існує`,
          HttpStatus.CONFLICT,
        );
      }
    }
    Object.assign(dish, updateData);
    if (title) {
      dish.title = title;
    }

    return await this.dishRepository.save(dish);
  }

  async remove(id) {
    const dish = await this.findOneDishByID(id);
    if (!dish) {
      throw new NotFoundException(`Страву з id ${id} не знайдено`);
    }
    await this.dishRepository.remove(dish);
  }

  async getIngredientsByDishId(id) {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishingredients', 'dishingredients')
      .leftJoinAndSelect('dishingredients.ingredient', 'ingredients')
      .where('dish.id = :id', { id })
      .getOne();
    return dish;
  }

  async safeDishes(allergyIds: number[]) {
    console.log(allergyIds);
    const dishesWithAllergens = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoin('dish.dishingredients', 'dishingredients')
      .leftJoin('dishingredients.ingredient', 'ingredient')
      .where('ingredient.id IN (:...allergyIds)', { allergyIds })
      .select('dish.id')
      .getMany();

    const dishIdsWithAllergens = dishesWithAllergens.map((dish) => dish.id);
    console.log(dishIdsWithAllergens);
    let safeDishesQuery = this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishingredients', 'dishingredients')
      .leftJoinAndSelect('dish.categories', 'dishcategory')
      .leftJoinAndSelect('dishingredients.ingredient', 'ingredient');

    if (dishIdsWithAllergens.length > 0) {
      safeDishesQuery = safeDishesQuery.where(
        'dish.id NOT IN (:...dishIdsWithAllergens)',
        {
          dishIdsWithAllergens,
        },
      );
    }

    const safeDishes = await safeDishesQuery.getMany();

    return safeDishes;
  }

  async addCategory(dishId: number, categoryId: number): Promise<Dishes> {
    const info = await this.dishRepository.findOne({
      where: { id: dishId },
      relations: ['categories'],
    });
    console.log(info);
    if (!info) {
      throw new NotFoundException('Страву не знайдено');
    }
    const categories = await this.dishCategoryService.findOne(categoryId);

    if (!categories || categories == null) {
      throw new NotFoundException('Категорію не знайдено');
    }
    const categoryExists = info.categories.some((cat) => cat.id === categoryId);
    console.log(categoryExists);
    if (categoryExists) {
      throw new HttpException(
        'Категорія вже існує в страві',
        HttpStatus.CONFLICT,
      );
    }
    info.categories = [...info.categories, categories];
    return this.dishRepository.save(info);
  }

  async deleteCategory(dishId, categoryId: number): Promise<Dishes> {
    const info = await this.dishRepository.findOne({
      where: { id: dishId },
      relations: ['categories'],
    });
    if (!info) {
      throw new NotFoundException('Страву не знайдено');
    }
    const categories = await this.dishCategoryService.findOne(categoryId);

    if (!categories || categories == null) {
      throw new NotFoundException('Категорію не знайдено');
    }
    info.categories = info.categories.filter((el) => categoryId !== el.id);

    return this.dishRepository.save(info);
  }
}
