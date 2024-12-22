import { Module } from '@nestjs/common';

import { IngredientCategoryService } from './ingredient-category.service';
import { IngredientCategoryController } from './ingredient-category.controller';

@Module({
  providers: [IngredientCategoryService],
  controllers: [IngredientCategoryController],
})
export class IngredientCategoryModule {}
