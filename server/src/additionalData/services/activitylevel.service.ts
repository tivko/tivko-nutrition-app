import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLevel } from '../entities/activitylevel.enity';
import { CreateActivityLevelDto } from '../dtos/activitylevel.create.dto';
import { UpdateActivityLevelDto } from '../dtos/activitylevel.update.dto';

@Injectable()
export class ActivityLevelService {
  constructor(
    @InjectRepository(ActivityLevel)
    private activityLevelRepository: Repository<ActivityLevel>,
  ) {}

  async create(
    createActivityLevelDto: CreateActivityLevelDto,
  ): Promise<ActivityLevel> {
    const activityLevel = this.activityLevelRepository.create(
      createActivityLevelDto,
    );
    return this.activityLevelRepository.save(activityLevel);
  }

  async findAll(): Promise<ActivityLevel[]> {
    return this.activityLevelRepository.find();
  }

  async findOne(id: number): Promise<ActivityLevel> {
    const activityLevel = await this.activityLevelRepository.findOneBy({ id });
    if (!activityLevel) {
      throw new NotFoundException(`ActivityLevel with ID ${id} not found`);
    }
    return activityLevel;
  }

  async update(
    id: number,
    updateActivityLevelDto: UpdateActivityLevelDto,
  ): Promise<ActivityLevel> {
    await this.activityLevelRepository.update(id, updateActivityLevelDto);
    const updatedActivityLevel = await this.activityLevelRepository.findOneBy({
      id,
    });
    if (!updatedActivityLevel) {
      throw new NotFoundException(`ActivityLevel with ID ${id} not found`);
    }
    return updatedActivityLevel;
  }

  async remove(id: number): Promise<void> {
    const result = await this.activityLevelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ActivityLevel with ID ${id} not found`);
    }
  }
}
