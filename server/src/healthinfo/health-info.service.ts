import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { HealthInfo } from './entity/healthinfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthInfoUpdateDto } from './dto/healthnfo.update.dto';
import { HealthInfoCreateDto } from './dto/healthinfo.create.dto';

@Injectable()
export class HealthInfoService {
  constructor(
    @InjectRepository(HealthInfo)
    private healthInfoRepository: Repository<HealthInfo>,
  ) {}

  async create(healthInfo: HealthInfoCreateDto) {
    return await this.healthInfoRepository.save(healthInfo);
  }

  async findOne(id): Promise<HealthInfo> {
    const res = await this.healthInfoRepository.findOne({ where: { id } });
    if (!res) {
      throw new NotFoundException('HealthInfo not found');
    }
    return res;
  }

  async findByUserId(userId: string): Promise<HealthInfo | undefined> {
    console.log(userId);
    const res = await this.healthInfoRepository
      .createQueryBuilder('healthInfo')
      .innerJoinAndSelect('healthInfo.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!res) {
      throw new NotFoundException('healthInfo not found');
    }
    return res;
  }

  async update(
    id: string,
    healthInfo: HealthInfoUpdateDto,
  ): Promise<HealthInfo> {
    const existingInfo = await this.findByUserId(id);
    console.log(healthInfo);
    if (!existingInfo) {
      throw new HttpException(`HealthInfo Not Found`, HttpStatus.NOT_FOUND);
    }
    Object.assign(existingInfo, healthInfo);
    return await this.healthInfoRepository.save(existingInfo);
  }

  async remove(id: string): Promise<void> {
    await this.healthInfoRepository.delete(id);
  }
}
