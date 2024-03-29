import { TicketsService } from './tickets.service';
import {
  Body,
  Controller,
  Put,
  Get,
  Query,
  Param,
  Post,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthUser } from 'src/utils/decorators';
import { Client, Consultant } from 'src/utils/typeorm';
import { CreateTicketDto } from './dtos/CreateTicket.dto';
import {
  JwtAdminAuthGuard,
  JwtAuthGuard,
  JwtClientAuthGuard,
  JwtConsultantAuthGuard,
} from 'src/auth/utils/Guard';
import { instanceToPlain } from 'class-transformer';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}
  @UseGuards(JwtClientAuthGuard)
  @Post()
  async createTicket(
    @AuthUser() user: Client,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketService.createTicket(createTicketDto, user);
  }

  @Patch(':id')
  async assignConsultantToTicket(
    @Param('id') ticketId: number,
    @Body() body: any,
  ) {
    return await this.ticketService.assignConsultantToTicket(ticketId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTicket(@Param('id') ticketId: number, @Body() updateTicket: any) {
    return await this.ticketService.updateTicket(ticketId, updateTicket);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTicketById(@Param('id') ticketId: number) {
    return instanceToPlain(await this.ticketService.getTicketById(ticketId));
  }

  @UseGuards(JwtConsultantAuthGuard)
  @Get('consultant/all')
  async getTicketsByConsultant(
    @AuthUser() user: Consultant,
    @Query('status') status?: string,
  ) {
    return instanceToPlain(
      await this.ticketService.getTicketsByConsultant(user, status),
    );
  }

  @UseGuards(JwtClientAuthGuard)
  @Get('client/all')
  async getTicketsByClient(
    @AuthUser() user: Client,
    @Query('status') status?: string,
  ) {
    return instanceToPlain(
      await this.ticketService.getTicketsByClient(user, status),
    );
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get('')
  async getAllProjects(@Query('status') status?: string) {
    return instanceToPlain(await this.ticketService.getAllProjects(status));
  }

  @Delete(':id')
  async deleteTicketById(@Param('id') ticketId: number) {
    return await this.ticketService.deleteTicketById(ticketId);
  }
}
