import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GoalService } from '../services/goal.service';
import { CreateGoalDto } from '../dtos/goal.create.dto';
import { UpdateGoalDto } from '../dtos/goal.update.dto';
import { Goal } from '../entities/goal.enity';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { GoalGeneralDto } from '../dtos/goal.general.dto';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() createUserGoalDto: CreateGoalDto): Promise<Goal> {
    return this.goalService.create(createUserGoalDto);
  }

  @Get()
  @UseInterceptors(new SerializeInterceptor<GoalGeneralDto>(GoalGeneralDto))
  async findAll(): Promise<any> {
    const res = await this.goalService.findAll();
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

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Goal> {
    return this.goalService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    return this.goalService.update(id, updateUserGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.goalService.remove(id);
  }
}
