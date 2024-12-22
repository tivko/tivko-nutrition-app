import { MacroSplitGeneralDto } from './../dtos/macrosplit.general.dto';
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
import { MacroSplitService } from '../services/macrosplit.service';
import { CreateMacroSplitDto } from '../dtos/macrosplit.create.dto';
import { Macrosplit } from '../entities/macrosplit.enity';
import { UpdateMacroSplitDto } from '../dtos/macrosplit.update.dto';
import { SerializeInterceptor } from 'src/interceptor/transformInterceptor';

@Controller('macrosplit')
export class MacrosplitController {
  constructor(private readonly macrosplitService: MacroSplitService) {}

  @Post()
  @UseInterceptors(
    new SerializeInterceptor<MacroSplitGeneralDto>(MacroSplitGeneralDto),
  )
  async create(@Body() createMacroSplitDto: CreateMacroSplitDto): Promise<any> {
    const res = await this.macrosplitService.create(createMacroSplitDto);
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
    new SerializeInterceptor<MacroSplitGeneralDto>(MacroSplitGeneralDto),
  )
  async findAll(): Promise<any> {
    const res = await this.macrosplitService.findAll();
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
    new SerializeInterceptor<MacroSplitGeneralDto>(MacroSplitGeneralDto),
  )
  async findOne(@Param('id') id: number): Promise<any> {
    const res = await this.macrosplitService.findOne(id);
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
    new SerializeInterceptor<MacroSplitGeneralDto>(MacroSplitGeneralDto),
  )
  async update(
    @Param('id') id: number,
    @Body() updateMacroSplitDto: UpdateMacroSplitDto,
  ): Promise<any> {
    const res = await this.macrosplitService.update(id, updateMacroSplitDto);
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
    new SerializeInterceptor<MacroSplitGeneralDto>(MacroSplitGeneralDto),
  )
  async remove(@Param('id') id: number): Promise<any> {
    await this.macrosplitService.remove(id);
    return {
      success: true,
    };
  }
}
