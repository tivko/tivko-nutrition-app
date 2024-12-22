import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { HealthInfo } from './entity/healthinfo.entity';
import { HealthInfoService } from './health-info.service';
import { HealthInfoUpdateDto } from './dto/healthnfo.update.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { HealthInfoCreateDto } from './dto/healthinfo.create.dto';
import { HealthInfoGeneralDto } from './dto/healthnfo.general.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';

@Controller('health')
export class HealthInfoController {
  constructor(private readonly healthInfoService: HealthInfoService) {}

  // @Roles('user')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @HttpCode(HttpStatus.OK)
  @Post('/create')
  async create(@Body() healthInfo: HealthInfoCreateDto) {
    try {
      const health = await this.healthInfoService.create(healthInfo);

      return {
        success: true,
        result: health,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  async UpdateHealth(
    @Body() healthInfo: HealthInfoUpdateDto,
    @CurrentUser('sub') id,
  ) {
    try {
      const updatedHealthInfo = await this.healthInfoService.update(
        id,
        healthInfo,
      );
      return {
        success: true,
        result: updatedHealthInfo,
      };
    } catch (error) {
      throw error;
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    new SerializeInterceptor<HealthInfoGeneralDto>(HealthInfoGeneralDto),
  )
  @Get('/userhealthinfo')
  async userhealthinfo(@CurrentUser('sub') id) {
    try {
      const response = await this.healthInfoService.findByUserId(id);
      return {
        success: true,
        result: response,
      };
    } catch (error) {
      return {
        success: false,
        result: error,
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<HealthInfo> {
    return this.healthInfoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id): Promise<void> {
    return this.healthInfoService.remove(id);
  }
}
