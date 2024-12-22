import { AllergiesDto } from './../users/dto/allergies.dto';
import { UsersService } from 'src/users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/dish.create.dto';
import { UpdateDishDto } from './dto/dish.update.dto';
import { IngredientsGeneralDto } from 'src/ingredient/dto/ingredients.general.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { DishGeneralDto } from './dto/dish.general.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';

@Controller('dishes')
export class DishController {
  constructor(
    private readonly dishService: DishService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async create(@Body() dishData: CreateDishDto) {
    try {
      const dish = await this.dishService.create(dishData);
      return {
        success: true,
        result: dish,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async getDishes() {
    try {
      const dishes = await this.dishService.allDishes();
      return {
        success: true,
        result: dishes,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('safedishes')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async getSafeDishes(@CurrentUser('sub') id: string) {
    try {
      const allergies = await this.usersService.getUserAllergyIds(id);
      let dishes;
      if (allergies.length == 0) {
        dishes = await this.dishService.allDishes();
      } else {
        dishes = await this.dishService.safeDishes(allergies);
      }
      const favDishes = await this.usersService.findUserByIdWithFavDish(id);
      const favDishIds = new Set(
        favDishes.favoritedishes.map((dish) => dish.id),
      );
      const dishesWithFavoriteTag = dishes.map((dish) => ({
        ...dish,
        isFavorite: favDishIds.has(dish.id),
      }));
      console.log(dishesWithFavoriteTag);
      return {
        success: true,
        result: dishesWithFavoriteTag,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @HttpCode(HttpStatus.OK)
  // @Get('favdishes')
  // @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  // async getFavDishes(@CurrentUser('sub') id: string) {
  //   try {
  //     const dishes = await this.dishService.allUserFavDishes(id);
  //     return {
  //       success: true,
  //       result: dishes,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async getDishById(@Param('id') id) {
    try {
      const dishes = await this.dishService.findOneDishByID(id);
      return {
        success: true,
        result: dishes,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/dishwithingredient/:id')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async getDishWithIngredientById(@Param('id') id) {
    try {
      const res = await this.dishService.getIngredientsByDishId(id);
      return {
        success: true,
        result: res,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.User, Role.Admin)
  async updateDish(@Body() dishUpdateDto: UpdateDishDto): Promise<any> {
    try {
      const updatedDish = await this.dishService.update(dishUpdateDto);
      return {
        success: true,
        result: updatedDish,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(Role.Admin) // Assuming only admins can delete users
  async delete(@Param('id') id) {
    return this.dishService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/category/:id')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async addCategoryIntoDish(
    @Param('id') dishId,
    @Body('categoryId') categoryId: number,
  ) {
    try {
      const ingredient = await this.dishService.addCategory(dishId, categoryId);
      return {
        success: true,
        result: ingredient,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/category/:id')
  @UseInterceptors(new SerializeInterceptor<DishGeneralDto>(DishGeneralDto))
  async deleteCategoryIntoIngredient(
    @Param('id') dishId,
    @Body('categoryId') categoryId: number,
  ) {
    try {
      const ingredient = await this.dishService.deleteCategory(
        dishId,
        categoryId,
      );
      return {
        success: true,
        result: ingredient,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
