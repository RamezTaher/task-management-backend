import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dtos/CreateIntervention.dto';
import { AuthUser } from 'src/utils/decorators';
import { Consultant } from 'src/utils/typeorm';
import { JwtConsultantAuthGuard } from 'src/auth/utils/Guard';
import { instanceToPlain } from 'class-transformer';

@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionService: InterventionsService) {}

  @UseGuards(JwtConsultantAuthGuard)
  @Post('')
  async CreateIntervention(
    @AuthUser() user: Consultant,
    @Body() createInterventionDto: CreateInterventionDto,
  ) {
    return instanceToPlain(
      await this.interventionService.createIntervention(
        user,
        createInterventionDto,
      ),
    );
  }

  @Put(':id')
  async updateIntervention(
    @Param('id') interventionId: number,
    @Body() updateIntervention: any,
  ) {
    return await this.interventionService.updateIntervention(
      interventionId,
      updateIntervention,
    );
  }

  @Get(':id')
  async getInterventionById(@Param('id') interventionId: number) {
    return instanceToPlain(
      await this.interventionService.getInterventionById(interventionId),
    );
  }

  @Get('')
  async getAllInterventions(@Query('status') status?: string) {
    return instanceToPlain(
      await this.interventionService.getAllInterventions(status),
    );
  }

  @UseGuards(JwtConsultantAuthGuard)
  @Get('consultant/all')
  async getInterventionByConsultant(
    @AuthUser() user: Consultant,
    @Query('status') status?: string,
  ) {
    return instanceToPlain(
      await this.interventionService.getInterventionsByConsultant(user, status),
    );
  }

  @Delete(':id')
  async deleteInterventionById(@Param('id') interventionId: number) {
    return instanceToPlain(
      await this.interventionService.deleteInterventionById(interventionId),
    );
  }
}
