import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { instanceToPlain } from 'class-transformer';

@Controller('Consultants')
export class ConsultantsController {
  constructor(private readonly ConsultantsService: ConsultantsService) {}

  @Get()
  async getAllConsultants() {
    return instanceToPlain(await this.ConsultantsService.getAllConsultants());
  }

  @Get(':id')
  async getConsultantById(@Param('id') consultantId: number) {
    return instanceToPlain(
      await this.ConsultantsService.getConsultantById(consultantId),
    );
  }

  @Put(':id')
  async updateConsultant(
    @Param('id') consultantId: number,
    @Body() updateClient: any,
  ) {
    return await this.ConsultantsService.updateConsultant(
      consultantId,
      updateClient,
    );
  }

  @Delete(':id')
  async deleteConsultantById(@Param('id') consultantId: number) {
    return await this.ConsultantsService.deleteConsultantById(consultantId);
  }
}
