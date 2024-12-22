import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateIngredientCategoryDto } from './dto/ingredient-category.create.dto';
import { IngredientCategory } from './entity/ingredient-category.entity';
import { IngredientCategoryService } from './ingredient-category.service';
import { UpdateIngredientCategoryDto } from './dto/ingredient-category.update.dto';

@Controller('ingredient-category')
export class IngredientCategoryController {
  constructor(
    private readonly ingredientCategoryService: IngredientCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createIngredientCategoryDto: CreateIngredientCategoryDto,
  ): Promise<IngredientCategory> {
    return this.ingredientCategoryService.create(createIngredientCategoryDto);
  }

  @Get()
  async findAll(): Promise<IngredientCategory[]> {
    return this.ingredientCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IngredientCategory> {
    return this.ingredientCategoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientCategoryDto: UpdateIngredientCategoryDto,
  ): Promise<IngredientCategory> {
    return this.ingredientCategoryService.update(
      +id,
      updateIngredientCategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.ingredientCategoryService.remove(+id);
  }
}
