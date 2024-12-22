import { Module } from '@nestjs/common';
import { DishCategoryController } from './dish-category.controller';
import { DishCategoryService } from './dish-category.service';

@Module({
  providers: [DishCategoryService],
  controllers: [DishCategoryController],
})
export class DishCategoryModule {}
