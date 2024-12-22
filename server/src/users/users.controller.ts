import { CreateMealProgramDto } from './../mealProgram/dto/mealProgram.create.dto';
import { MealProgramService } from 'src/mealProgram/meal-program.service';
import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Patch,
  UseGuards,
  Get,
  Param,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { UsersCreateDto } from './dto/users.create.dto';
import { UsersUpdateDto } from './dto/users.update.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';
import { UsersGeneralDto } from './dto/users.general.dto';
import { AllergiesDto } from './dto/allergies.dto';
import { FavDishDto } from './dto/favdish.dto';
import { HealthInfoCreateDto } from 'src/healthinfo/dto/healthinfo.create.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mealProgramService: MealProgramService,
  ) {}

  @Post('/create')
  async create(@Body() createUserDto: UsersCreateDto) {
    try {
      const email = await this.userService.findOneUserByEmail(
        createUserDto.email,
      );
      if (email) {
        throw new HttpException(
          `Користувач з email ${createUserDto?.email} вже зареєстрований`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.create(createUserDto);
      return {
        success: true,
        result: user,
      };
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  async updateUser(
    @Body() usersUpdateDto: UsersUpdateDto,
    @CurrentUser('sub') id: string,
  ): Promise<any> {
    try {
      const updatedUser = await this.userService.update(id, usersUpdateDto);
      return {
        success: true,
        result: updatedUser,
      };
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('health')
  @UseInterceptors(new SerializeInterceptor<UsersGeneralDto>(UsersGeneralDto))
  async getCurrentUserHealth(@CurrentUser('sub') id: string): Promise<any> {
    try {
      const res = await this.userService.findUserByIdWithHealth(id);
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
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('allergies')
  async getCurrentUserAllergies(@CurrentUser('sub') id: string): Promise<any> {
    try {
      const res = await this.userService.findUserByIdWithAllergies(id);
      if (res) {
        return {
          success: true,
          result: res.allergies,
        };
      } else {
        return {
          success: false,
          result: [],
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('favdish')
  async getCurrentUserFavDish(@CurrentUser('sub') id: string): Promise<any> {
    try {
      const allergies = await this.userService.getUserAllergyIds(id);
      console.log(allergies);
      let res;
      if (allergies.length == 0) {
        res = await this.userService.findUserByIdWithFavDish(id);
      } else {
        res = await this.userService.findUserByIdWithFavDishAndAlergies(
          id,
          allergies,
        );
      }
      console.log(res);
      if (res) {
        return {
          success: true,
          result: res.favoritedishes,
        };
      } else {
        return {
          success: false,
          result: [],
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('allergies')
  @UseInterceptors(new SerializeInterceptor<UsersGeneralDto>(UsersGeneralDto))
  async addAllergieForUser(
    @CurrentUser('sub') id: string,
    @Body() addAllergiesDto: AllergiesDto,
  ): Promise<any> {
    try {
      const res = await this.userService.addAllergies(id, addAllergiesDto);
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
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('favdish')
  @UseInterceptors(new SerializeInterceptor<UsersGeneralDto>(UsersGeneralDto))
  async addFavdishForUser(
    @CurrentUser('sub') id: string,
    @Body() addFavDishDto: FavDishDto,
  ): Promise<any> {
    try {
      const res = await this.userService.addFavDish(id, addFavDishDto);
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
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('favdish')
  @UseInterceptors(new SerializeInterceptor<UsersGeneralDto>(UsersGeneralDto))
  async deleteFavDishForUser(
    @CurrentUser('sub') id: string,
    @Body() favDishDto: FavDishDto,
  ): Promise<any> {
    try {
      const res = await this.userService.deleteFavDish(id, favDishDto);
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
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('allergies')
  @UseInterceptors(new SerializeInterceptor<UsersGeneralDto>(UsersGeneralDto))
  async deleteAllergieForUser(
    @CurrentUser('sub') id: string,
    @Body() allergiesDto: AllergiesDto,
  ): Promise<any> {
    const res = await this.userService.deleteAllergies(id, allergiesDto);
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

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserInfo(@Param('id') id: string): Promise<any> {
    try {
      const user = await this.userService.findUserById(id);
      return {
        success: true,
        result: user,
      };
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('health/:id')
  async getCurrentUserInfoWithHealth(@Param('id') id: string): Promise<any> {
    try {
      const user = await this.userService.findUserByIdWithHealth(id);
      return {
        success: true,
        result: user,
      };
    } catch (error) {
      throw error;
    }
  }
}
