import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
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
    const newTicket = this.ticketRepository.create({
      title: params.title,
      description: params.description,
      endDate: params.endDate,
      client: instanceToPlain(user),
    });

    return await this.ticketRepository.save(newTicket);
  }

  async updateTicket(ticketId: number, updateTicket: Partial<Ticket>) {
    const ticket = await this.ticketRepository.findOne(ticketId);
    if (!ticket)
      throw new HttpException(
        'No Ticket Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    const updatedTicket = Object.assign(ticket, updateTicket);

    this.ticketRepository.save(updatedTicket);
    return {
      success: true,
      statusCode: 200,
      message: 'Ticket Updated Successfully',
    };
  }

  async getTicketById(ticketId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      relations: ['consultant', 'tasks'],
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundException(`ticket with ID ${ticketId} not found`);
    }

    return ticket;
  }

  async getTicketsByConsultant(
    consultant: Consultant,
    status?: string,
  ): Promise<Ticket[]> {
    let queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.consultant', 'consultant')
      .leftJoinAndSelect('ticket.client', 'client')
      .where('ticket.consultant.id = :id', { id: consultant.id });

    if (status) {
      queryBuilder = queryBuilder.andWhere('ticket.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
  }

  async getTicketsByClient(client: Client, status?: string): Promise<Ticket[]> {
    let queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.client', 'client')
      .leftJoinAndSelect('ticket.consultant', 'consultant')
      .where('ticket.client.id = :id', { id: client.id });

    if (status) {
      queryBuilder = queryBuilder.andWhere('ticket.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
  }

  async deleteTicketById(ticketId: number) {
    const result = await this.ticketRepository.delete(ticketId);

    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Ticket Deleted Successfully',
    };
  }
}
