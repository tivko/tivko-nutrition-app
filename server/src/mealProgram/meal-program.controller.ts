import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { MealProgramService } from './meal-program.service';
import { CreateMealProgramDto } from './dto/mealProgram.create.dto';
import { UpdateMealProgramDto } from './dto/mealProgram.update.dto';
import { MealProgramGeneralDto } from './dto/mealProgram.general.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { Status } from './enums/status.enum';

@Controller('mealprogram')
export class MealProgramController {
  constructor(private readonly mealProgramService: MealProgramService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  @Post('create')
  async create(
    @CurrentUser('sub') id: string,
    @Body() createMealProgramDto: CreateMealProgramDto,
  ): Promise<any> {
    try {
      const res = await this.mealProgramService.create(
        createMealProgramDto,
        id,
      );
      if (res) {
        return {
          status: true,
          result: res,
        };
      } else {
        return {
          status: false,
          result: [],
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  async UpdateHealth(
    @Body() mealProgram: UpdateMealProgramDto,
    @Param('id') id: string,
  ) {
    try {
      const updatedMealProgram = await this.mealProgramService.update(
        id,
        mealProgram,
      );
      return {
        success: true,
        result: updatedMealProgram,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  @Get('/allusermealprograms')
  async getCurrentUserAllMealPrograms(@CurrentUser('sub') id: string) {
    try {
      const response =
        await this.mealProgramService.findAllUserMealPrograms(id);

      return {
        success: true,
        result: response,
      };
    } catch (error) {
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('activemealprogram')
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  async getCurrentUserActiveMealProgram(
    @CurrentUser('sub') id: string,
  ): Promise<any> {
    const res = await this.mealProgramService.findActiveUserMealProgram(id);
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

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('activemealprogramdayliInfo/:date')
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  async getCurrentUserActiveMealProgramByDate(
    @CurrentUser('sub') id: string,
    @Param('date') date: Date,
  ): Promise<any> {
    console.log(date);
    const res = await this.mealProgramService.findActiveUserMealProgramByDate(
      id,
      date,
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

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('mealprogram/:status')
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  async getCurrentUserMealProgramsByStatus(
    @CurrentUser('sub') id: string,
    @Param('status') status: Status,
  ): Promise<any> {
    const res = await this.mealProgramService.findUserMealProgramByStatus(
      id,
      status,
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

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('mealprogram-dailyinfo/:idProgr')
  @UseInterceptors(
    new SerializeInterceptor<MealProgramGeneralDto>(MealProgramGeneralDto),
  )
  async getCurrentUserMealProgramByIdWithDailyInfo(
    @Param('idProgr') idProgr: number,
  ): Promise<any> {
    const res =
      await this.mealProgramService.findMealProgramByIdWithDailyInfo(idProgr);
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
}
