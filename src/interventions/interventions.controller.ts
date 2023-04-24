import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dtos/CreateIntervention.dto';
import { UpdateInterventionStatus } from 'src/utils/types';

@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionService: InterventionsService) {}

  @Post('')
  async CreateIntervention(
    @Body() createInterventionDto: CreateInterventionDto,
  ) {
    return await this.interventionService.createIntervention(
      createInterventionDto,
    );
  }

  @Put(':id')
  async updateIntervention(
    @Param('id') interventionId: number,
    @Body() updateInterventionStatus: UpdateInterventionStatus,
  ) {
    const { status } = updateInterventionStatus;
    return await this.interventionService.updateIntervention(
      interventionId,
      status,
    );
  }
}
