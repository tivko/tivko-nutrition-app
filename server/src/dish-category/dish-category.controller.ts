import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { DishCategoryService } from './dish-category.service';
import { DishCategory } from './entity/dish-category.entity';
import { CreateDishCategoryDto } from './dto/dish-category.create.dto';
import { UpdateDishCategoryDto } from './dto/dish-category.update.dto';
import { DishCategoryGeneralDto } from './dto/dish-category.general.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';

@Controller('dish-category')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  @Post()
  async create(
    @Body() createDishCategoryDto: CreateDishCategoryDto,
  ): Promise<DishCategory> {
    return this.dishCategoryService.create(createDishCategoryDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.dishCategoryService.findAll();
  }

  @Get(':id')
  @UseInterceptors(
    new SerializeInterceptor<DishCategoryGeneralDto>(DishCategoryGeneralDto),
  )
  async findOne(@Param('id') id: string): Promise<any> {
    const res = await this.dishCategoryService.findOne(+id);
    if (res) {
      return {
        success: true,
        result: res,
      };
    } else {
      return {
        success: false,
        result: [],
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDishCategoryDto: UpdateDishCategoryDto,
  ): Promise<DishCategory> {
    return this.dishCategoryService.update(+id, updateDishCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.dishCategoryService.remove(+id);
  }
}
