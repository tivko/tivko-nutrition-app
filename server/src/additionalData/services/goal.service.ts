import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGoalDto } from '../dtos/goal.create.dto';
import { UpdateGoalDto } from '../dtos/goal.update.dto';
import { Goal } from '../entities/goal.enity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private userGoalRepository: Repository<Goal>,
  ) {}

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const userGoal = this.userGoalRepository.create(createGoalDto);
    return this.userGoalRepository.save(userGoal);
  }

  async findAll(): Promise<Goal[]> {
    return await this.userGoalRepository.find();
  }

  async findOne(id: number): Promise<Goal> {
    const userGoal = await this.userGoalRepository.findOneBy({ id });
    if (!userGoal) {
      throw new NotFoundException(`Ціль з ID ${id} не знайдено`);
    }
    return userGoal;
  }

  async update(id: number, updateUserGoalDto: UpdateGoalDto): Promise<Goal> {
    await this.userGoalRepository.update(id, updateUserGoalDto);
    const updatedUserGoal = await this.userGoalRepository.findOneBy({ id });
    if (!updatedUserGoal) {
      throw new NotFoundException(`Ціль з ID ${id} не знайдено`);
    }
    return updatedUserGoal;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userGoalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ціль з ID ${id} не знайдено`);
    }
  }
}
