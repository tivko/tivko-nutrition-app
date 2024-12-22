import { UsersService } from 'src/users/users.service';
import { UsersModule } from './../users/users.module';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/ingredient.create.dto';
import { UpdateIngredientDto } from './dto/ingredient.update.dto';
import { IngredientsGeneralDto } from './dto/ingredients.general.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('ingredient')
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  async create(@Body() ingredientData: CreateIngredientDto) {
    try {
      const ingredient = await this.ingredientService.create(ingredientData);
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
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  @Get('all')
  async allIngredients() {
    try {
      const ingredients = await this.ingredientService.allIngredients();
      return {
        success: true,
        result: ingredients,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  @Get('safeIngredients')
  async safeIngredients(@CurrentUser('sub') id: string) {
    try {
      const allergies = await this.usersService.getUserAllergyIds(id);
      let ingredients;
      if (allergies.length == 0) {
        ingredients = await this.ingredientService.allIngredients();
      } else {
        ingredients = await this.ingredientService.safeIngredients(allergies);
      }
      return {
        success: true,
        result: ingredients,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  async getDishById(@Param('id') id) {
    try {
      const ingredient = await this.ingredientService.findOneIngredientByID(id);
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
  @Post('/:id')
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  async addCategoryIntoIngredient(
    @Param('id') ingredientId,
    @Body('categoryId') categoryId: number,
  ) {
    try {
      const ingredient = await this.ingredientService.addCategory(
        ingredientId,
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

  @HttpCode(HttpStatus.OK)
  @Delete('/category/:id')
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  async deleteCategoryIntoIngredient(
    @Param('id') ingredientId,
    @Body('categoryId') categoryId: number,
  ) {
    try {
      const ingredient = await this.ingredientService.deleteCategory(
        ingredientId,
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

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  @UseInterceptors(
    new SerializeInterceptor<IngredientsGeneralDto>(IngredientsGeneralDto),
  )
  async updateDish(
    @Param('id') id,
    @Body() dishUpdateDto: UpdateIngredientDto,
  ): Promise<any> {
    try {
      const updatedIngredient = await this.ingredientService.update(
        id,
        dishUpdateDto,
      );
      return {
        success: true,
        result: updatedIngredient,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.ingredientService.remove(id);
  }
}
