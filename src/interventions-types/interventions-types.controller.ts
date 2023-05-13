import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InterventionsTypesService } from './interventions-types.service';
import { CreateInterventionTypeDto } from './dtos/CreateInterventionType';
import { InterventionType } from 'src/utils/typeorm';

@Controller('interventions-types')
export class InterventionsTypesController {
  constructor(
    private readonly interventionTypeService: InterventionsTypesService,
  ) {}

  @Post()
  async createInterventionType(
    @Body() createInterventionTypeDto: CreateInterventionTypeDto,
  ): Promise<InterventionType> {
    return this.interventionTypeService.createInterventionType(
      createInterventionTypeDto,
    );
  }

  @Put(':id')
  async updateInterventionType(
    @Param('id') id: number,
    @Body() updateInterventionType: any,
  ) {
    return await this.interventionTypeService.updateInterventionType(
      id,
      updateInterventionType,
    );
  }

  @Get()
  async getAllInterventionTypes() {
    return await this.interventionTypeService.getAllInterventionTypes();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<InterventionType> {
    return await this.interventionTypeService.getInterventionTypeById(id);
  }

  @Delete(':id')
  async deleteInterventionType(@Param('id') id: number) {
    return await this.interventionTypeService.deleteInterventionType(id);
  }
}
