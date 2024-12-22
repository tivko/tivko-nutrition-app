import { DishIngredientService } from './dish-ingredient.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { CreateDishIngredientDto } from './dto/dish-ingredients.create.dto';
import { UpdateDishIngredientDto } from './dto/dish-ingredients.update.dto';
import { DeleteDishIngredientDto } from './dto/dish-ingredients.delete.dto';

@Controller('dishingredient')
export class DishIngredientController {
  constructor(private readonly dishingredientService: DishIngredientService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() dishIngredientData: CreateDishIngredientDto) {
    try {
      const dish = await this.dishingredientService.create(dishIngredientData);
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
  @Patch('/update')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.User, Role.Admin)
  async updateDish(
    @Body() dishUpdateDto: UpdateDishIngredientDto,
  ): Promise<any> {
    try {
      const updatedDish =
        await this.dishingredientService.update(dishUpdateDto);
      return {
        success: true,
        result: updatedDish,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete()
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(Role.Admin) // Assuming only admins can delete users
  async delete(@Body() deleteDto: DeleteDishIngredientDto) {
    await this.dishingredientService.remove(deleteDto);
    return {
      success: true,
    };
  }
}
