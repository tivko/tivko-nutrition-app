import { CreateDailyInfoDto } from './dto/daily-info.create.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DailyInfo } from './entity/dailyInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealProgramService } from 'src/mealProgram/meal-program.service';
import { spec } from 'node:test/reporters';
import { UpdateDailyInfoDto } from './dto/daily-info.update.dto';

@Injectable()
export class DailyInfoService {
  constructor(
    @InjectRepository(DailyInfo)
    private dailyInfoRepository: Repository<DailyInfo>,
    private mealProgramService: MealProgramService,
  ) {}

  async createDailyInfo(
    createDailyInfoDto: CreateDailyInfoDto,
  ): Promise<DailyInfo> {
    const mealProgram = await this.mealProgramService.findOne(
      createDailyInfoDto.mealProgram,
    );
    if (!mealProgram) {
      throw new NotFoundException('MealProgram not found');
    }
    const res = await this.findByDateAndIdMealProgram(
      createDailyInfoDto.date,
      mealProgram.id,
    );
    if (res) {
      throw new HttpException(`DailyInfo already exist`, HttpStatus.NOT_FOUND);
    } else {
      const date = new Date(createDailyInfoDto.date);
      return await this.dailyInfoRepository.save({
        ...createDailyInfoDto,
        date,
        mealProgram,
      });
    }
  }

  async findOne(id: number): Promise<DailyInfo> {
    const res = await this.dailyInfoRepository.findOne({
      where: { id: id },
      relations: ['mealProgram', 'dailyDishes'],
    });
    if (!res) {
      throw new NotFoundException(`DailyInfo з id ${id}  не знайдено`);
    }
    return res;
  }

  async getCurrentWeightData(
    mealProgramId: number,
  ): Promise<{ value: number; label: Date }[]> {
    const dailyInfoList = await this.dailyInfoRepository.find({
      where: { mealProgram: { id: mealProgramId } },
      select: ['currentWeight', 'date'],
      relations: ['mealProgram'],
    });

    return dailyInfoList.map((info) => ({
      value: info.currentWeight,
      label: info.date,
    }));
  }

  async updateDailyInfo(
    idDailyInfo,
    updateDailyInfoDto: UpdateDailyInfoDto,
  ): Promise<DailyInfo> {
    const dailyInfo = await this.findOne(idDailyInfo);

    if (dailyInfo) {
      const res = await this.findByDateAndIdMealProgram(
        dailyInfo.date,
        dailyInfo.mealProgram.id,
      );
      if (!res) {
        throw new NotFoundException(`DailyInfo не знайдено`);
      }
      Object.assign(res, updateDailyInfoDto);
      await this.dailyInfoRepository.save(res);
      return res;
    } else {
      throw new NotFoundException(`DailyInfo не знайдено`);
    }
  }
  async findByDateAndIdMealProgram(
    dateInfo: Date | string,
    idMealProgram: number,
  ) {
    const date = dateInfo instanceof Date ? dateInfo : new Date(dateInfo);
    console.log(date);

    // Format date to exclude time part
    const dateString = date.toISOString().split('T')[0];

    const res = await this.dailyInfoRepository
      .createQueryBuilder('dailyInfo')
      .leftJoinAndSelect('dailyInfo.mealProgram', 'mealProgram')
      .leftJoinAndSelect('dailyInfo.dailyDishes', 'dailyDishes')
      .leftJoinAndSelect('dailyDishes.dish', 'dish')
      .where('mealProgram.id = :idMealProgram', { idMealProgram })
      .andWhere('DATE(dailyInfo.date) = :date', { date: dateString })
      .getOne();

    console.log({ res });
    return res;
  }

  async findByDateAndIdMealProgramRequest(
    dateInfo: Date,
    idMealProgram: number,
  ) {
    console.log(dateInfo);
    console.log(idMealProgram);
    const res = await this.findByDateAndIdMealProgram(dateInfo, idMealProgram);
    if (!res) {
      throw new NotFoundException(`Program не знайдено`);
    }
    return res;
  }
}
