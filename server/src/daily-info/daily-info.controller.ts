import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DailyInfoService } from './daily-info.service';
import { HealthInfoCreateDto } from 'src/healthinfo/dto/healthinfo.create.dto';
import { CreateDailyInfoDto } from './dto/daily-info.create.dto';
import { UpdateDailyInfoDto } from './dto/daily-info.update.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { DailyInfoGeneralDto } from './dto/daily-info.general.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';

@Controller('dailyinfo')
export class DailyInfoController {
  constructor(private readonly dailyInfoService: DailyInfoService) {}
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  @UseInterceptors(
    new SerializeInterceptor<DailyInfoGeneralDto>(DailyInfoGeneralDto),
  )
  async create(@Body() createDailyInfoDto: CreateDailyInfoDto) {
    console.log(createDailyInfoDto);
    try {
      const dailyinfo =
        await this.dailyInfoService.createDailyInfo(createDailyInfoDto);
      return {
        success: true,
        result: dailyinfo,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  @UseInterceptors(
    new SerializeInterceptor<DailyInfoGeneralDto>(DailyInfoGeneralDto),
  )
  async update(
    @Body() updateDailyInfoDto: UpdateDailyInfoDto,
    @Param('id') id,
  ) {
    try {
      const dailyinfo = await this.dailyInfoService.updateDailyInfo(
        id,
        updateDailyInfoDto,
      );
      return {
        success: true,
        result: dailyinfo,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseInterceptors(
    new SerializeInterceptor<DailyInfoGeneralDto>(DailyInfoGeneralDto),
  )
  async findByDateAndIdMealProgram(
    @Query('date') date: Date,
    @Query('mealProgram') mealProgram: number,
  ) {
    try {
      const dailyinfo =
        await this.dailyInfoService.findByDateAndIdMealProgramRequest(
          date,
          mealProgram,
        );
      return {
        success: true,
        result: dailyinfo,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('weight-data')
  async getCurrentWeightData(@Query('mealProgramId') mealProgramId: number) {
    return this.dailyInfoService.getCurrentWeightData(mealProgramId);
  }
}
