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

  async assignConsultantToTicket(ticketId: number, body: any): Promise<Ticket> {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.consultants', 'consultant')
      .where('ticket.id = :id', { id: ticketId })
      .getOne();
    const consultant = await this.consultantService.findConsultant({
      id: body.consultantId,
    });

    const assignedConsultantIds = ticket.consultants.map(
      (consultant) => consultant.id,
    );

    if (!ticket || !consultant) {
      throw new NotFoundException('Ticket or consultant not found');
    }
    if (assignedConsultantIds.includes(consultant.id)) {
      throw new HttpException(
        'Consultant Already exist on this Ticket',
        HttpStatus.CONFLICT,
      );
    }

    ticket.consultants.push(consultant);
    await this.ticketRepository.save(ticket);

    return ticket;
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
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.consultants', 'consultant')
      .leftJoinAndSelect('ticket.tasks', 'task')
      .where('ticket.id = :id', { id: ticketId })
      .getOne();

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    return ticket;
  }

  async getTicketsByConsultant(
    consultant: Consultant,
    status?: string,
  ): Promise<Ticket[]> {
    let queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.consultants', 'consultant')
      .leftJoinAndSelect('ticket.client', 'client')
      .leftJoinAndSelect('ticket.tasks', 'task')
      .where('consultant.id = :id', { id: consultant.id });

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
      .leftJoinAndSelect('ticket.consultants', 'consultant')
      .leftJoin('ticket.client', 'client')
      .where('client.id = :id', { id: client.id });

    if (status) {
      queryBuilder = queryBuilder.andWhere('ticket.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
  }
  async getAllProjects(status?: string): Promise<Ticket[]> {
    let queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.consultants', 'consultant')
      .leftJoinAndSelect('ticket.client', 'client')
      .leftJoinAndSelect('ticket.tasks', 'task');

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
