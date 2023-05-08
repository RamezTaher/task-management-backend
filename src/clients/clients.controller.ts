import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { instanceToPlain } from 'class-transformer';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Get()
  async getAllClients() {
    return instanceToPlain(await this.clientService.getAllClient());
  }

  @Get(':id')
  async getClientById(@Param('id') clientId: number) {
    return instanceToPlain(await this.clientService.getClientById(clientId));
  }

  @Put(':id')
  async updateConsultant(
    @Param('id') clientId: number,
    @Body() updateClient: any,
  ) {
    return await this.clientService.updateClient(clientId, updateClient);
  }

  @Delete(':id')
  async deleteClientById(@Param('id') clientId: number) {
    return await this.clientService.deleteClientById(clientId);
  }
}
