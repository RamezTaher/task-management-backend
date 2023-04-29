import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsService } from 'src/tickets/tickets.service';
import { Task } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    private readonly ticketService: TicketsService,
  ) {}

  async createTask(params: any) {
    const ticket = await this.ticketService.findTicketById(params.ticketId);
    if (!ticket)
      throw new HttpException(
        'This Ticket Does Not Exist',
        HttpStatus.BAD_REQUEST,
      );

    const newTask = this.taskRepository.create({
      title: params.title,
      description: params.description,
      endDate: params.endDate,
      ticket,
    });

    await this.taskRepository.save(newTask);

    return {
      success: true,
      statusCode: 201,
      message: 'Task Created Successfully',
    };
  }
}
