import { Module } from '@nestjs/common';
import { DishIngredientController } from './dish-ingredient.controller';
import { DishIngredientService } from './dish-ingredient.service';

@Module({
  providers: [DishIngredientService],
  controllers: [DishIngredientController],
})
export class DishesModule {}
