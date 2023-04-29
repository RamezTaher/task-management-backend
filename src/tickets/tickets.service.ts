import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { Client, Consultant, Ticket } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    private readonly consultantService: ConsultantsService,
  ) {}

  async createTicket(params: any, user: Client) {
    const consultant = await this.consultantService.findConsultant(
      params.consultantId,
    );
    if (!consultant)
      throw new HttpException(
        'This Channel Does Not Exist',
        HttpStatus.BAD_REQUEST,
      );

    const newTicket = this.ticketRepository.create({
      title: params.title,
      description: params.description,
      endDate: params.endDate,
      consultant: instanceToPlain(consultant),
      client: instanceToPlain(user),
    });

    return await this.ticketRepository.save(newTicket);
  }
}
