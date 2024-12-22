import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Macrosplit } from '../entities/macrosplit.enity';
import { UpdateMacroSplitDto } from '../dtos/macrosplit.update.dto';
import { CreateMacroSplitDto } from '../dtos/macrosplit.create.dto';

@Injectable()
export class MacroSplitService {
  constructor(
    @InjectRepository(Macrosplit)
    private macroSplitRepository: Repository<Macrosplit>,
  ) {}

  async create(createMacroSplitDto: CreateMacroSplitDto): Promise<Macrosplit> {
    const macroSplit = this.macroSplitRepository.create(createMacroSplitDto);
    return this.macroSplitRepository.save(macroSplit);
  }

  async findAll(): Promise<Macrosplit[]> {
    return this.macroSplitRepository.find();
  }

  async findOne(id: number): Promise<Macrosplit> {
    const macroSplit = await this.macroSplitRepository.findOneBy({ id });
    if (!macroSplit) {
      throw new NotFoundException(`MacroSplit with ID ${id} not found`);
    }
    return macroSplit;
  }

  async update(
    id: number,
    updateMacroSplitDto: UpdateMacroSplitDto,
  ): Promise<Macrosplit> {
    await this.macroSplitRepository.update(id, updateMacroSplitDto);
    const updmacroSplit = await this.macroSplitRepository.findOneBy({ id });
    if (!updmacroSplit) {
      throw new NotFoundException(`MacroSplit with ID ${id} not found`);
    }
    return updmacroSplit;
  }

  async remove(id: number): Promise<void> {
    const result = await this.macroSplitRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MacroSplit with ID ${id} not found`);
    }
  }
}
