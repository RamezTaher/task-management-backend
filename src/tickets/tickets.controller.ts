import { TicketsService } from './tickets.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/utils/decorators';
import { Client } from 'src/utils/typeorm';
import { CreateTicketDto } from './dtos/CreateTicket.dto';
import { JwtClientAuthGuard } from 'src/auth/utils/Guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}
  @UseGuards(JwtClientAuthGuard)
  @Post()
  async createChannel(
    @AuthUser() user: Client,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketService.createTicket(createTicketDto, user);
  }
}
