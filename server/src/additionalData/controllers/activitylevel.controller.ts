import { ActivityLevelGeneralDto } from './../dtos/activitylevel.general.dto';
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
import { ActivityLevelService } from '../services/activitylevel.service';
import { ActivityLevel } from '../entities/activitylevel.enity';
import { CreateActivityLevelDto } from '../dtos/activitylevel.create.dto';
import { UpdateActivityLevelDto } from '../dtos/activitylevel.update.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';

@Controller('activity-level')
export class ActivityLevelController {
  constructor(private readonly activityLevelService: ActivityLevelService) {}

  @Post()
  @UseInterceptors(
    new SerializeInterceptor<ActivityLevelGeneralDto>(ActivityLevelGeneralDto),
  )
  async create(
    @Body() createActivityLevelDto: CreateActivityLevelDto,
  ): Promise<any> {
    const res = await this.activityLevelService.create(createActivityLevelDto);
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

  @Get()
  @UseInterceptors(
    new SerializeInterceptor<ActivityLevelGeneralDto>(ActivityLevelGeneralDto),
  )
  async findAll(): Promise<any> {
    const res = await this.activityLevelService.findAll();
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
  @UseInterceptors(
    new SerializeInterceptor<ActivityLevelGeneralDto>(ActivityLevelGeneralDto),
  )
  async findOne(@Param('id') id: number): Promise<any> {
    const res = await this.activityLevelService.findOne(id);
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

  @Put(':id')
  @UseInterceptors(
    new SerializeInterceptor<ActivityLevelGeneralDto>(ActivityLevelGeneralDto),
  )
  async update(
    @Param('id') id: number,
    @Body() updateActivityLevelDto: UpdateActivityLevelDto,
  ): Promise<any> {
    const res = await this.activityLevelService.update(
      id,
      updateActivityLevelDto,
    );
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

  @Delete(':id')
  @UseInterceptors(
    new SerializeInterceptor<ActivityLevelGeneralDto>(ActivityLevelGeneralDto),
  )
  async remove(@Param('id') id: number): Promise<any> {
    await this.activityLevelService.remove(id);
    return {
      success: true,
    };
  }
}
