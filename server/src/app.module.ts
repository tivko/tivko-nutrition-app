import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configDB } from './db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Users } from './users/entity/users.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { HealthInfo } from './healthinfo/entity/healthinfo.entity';
import { ActivityLevel } from './additionalData/entities/activitylevel.enity';
import { ActivityLevelController } from './additionalData/controllers/activitylevel.controller';
import { ActivityLevelService } from './additionalData/services/activitylevel.service';
import { HealthInfoService } from './healthinfo/health-info.service';
import { HealthInfoController } from './healthinfo/health-info.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { GoalController } from './additionalData/controllers/goal.controller';
import { GoalService } from './additionalData/services/goal.service';
import { Goal } from './additionalData/entities/goal.enity';
import { MacrosplitController } from './additionalData/controllers/macrosplit.controller';
import { MacroSplitService } from './additionalData/services/macrosplit.service';
import { Macrosplit } from './additionalData/entities/macrosplit.enity';
import { Ingredients } from './ingredient/entity/ingredient.entity';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';
import { Dishes } from './dish/entity/dishes.entity';
import { DishController } from './dish/dish.controller';
import { DishService } from './dish/dish.service';
import { DishIngredientController } from './dish-ingredients/dish-ingredient.controller';
import { DishIngredientService } from './dish-ingredients/dish-ingredient.service';
import { DishIngredients } from './dish-ingredients/entity/dish-ingredient.entity';
import { MealProgram } from './mealProgram/entity/meal-program.entity';
import { MealProgramController } from './mealProgram/meal-program.controller';
import { MealProgramService } from './mealProgram/meal-program.service';
import { DailyInfo } from './daily-info/entity/dailyInfo.entity';
import { DailyInfoController } from './daily-info/daily-info.controller';
import { DailyInfoService } from './daily-info/daily-info.service';
import { DailyDishes } from 'src/daily-dishes/entity/dailyDishes.entity';
import { DailyDishesController } from './daily-dishes/daily-dishes.controller';
import { DailyDishesService } from './daily-dishes/daily-dishes.service';
import { DishCategory } from './dish-category/entity/dish-category.entity';
import { DishCategoryController } from './dish-category/dish-category.controller';
import { DishCategoryService } from './dish-category/dish-category.service';
import { IngredientCategory } from './ingredient-category/entity/ingredient-category.entity';
import { IngredientCategoryController } from './ingredient-category/ingredient-category.controller';
import { IngredientCategoryService } from './ingredient-category/ingredient-category.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configDB.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([HealthInfo]),
    TypeOrmModule.forFeature([ActivityLevel]),
    TypeOrmModule.forFeature([Dishes]),
    TypeOrmModule.forFeature([Ingredients]),
    TypeOrmModule.forFeature([MealProgram]),
    TypeOrmModule.forFeature([DishIngredients]),
    TypeOrmModule.forFeature([Goal]),
    TypeOrmModule.forFeature([Macrosplit]),
    TypeOrmModule.forFeature([DailyInfo]),
    TypeOrmModule.forFeature([DailyDishes]),
    TypeOrmModule.forFeature([DishCategory]),
    TypeOrmModule.forFeature([IngredientCategory]),

    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [
    UsersController,
    HealthInfoController,
    DishController,
    IngredientController,
    MealProgramController,
    DishCategoryController,
    IngredientCategoryController,
    ActivityLevelController,
    GoalController,
    MacrosplitController,
    DishIngredientController,
    DailyInfoController,
    DailyDishesController,
  ],
  providers: [
    UsersService,
    HealthInfoService,
    ActivityLevelService,
    DishService,
    IngredientService,
    DishIngredientService,
    MealProgramService,
    DailyInfoService,
    JwtStrategy,
    AuthService,
    DailyDishesService,
    GoalService,
    MacroSplitService,
    DishCategoryService,
    IngredientCategoryService,
  ],
})
export class AppModule {}
