import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
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
    const ticket = await this.ticketService.getTicketById(params.ticketId);
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

  async updateTask(taskId: number, updateTask: Partial<Task>) {
    const task = await this.taskRepository.findOne(taskId);
    if (!task)
      throw new HttpException(
        'No Task Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    const updatedTask = Object.assign(task, updateTask);

    this.taskRepository.save(updatedTask);
    return {
      success: true,
      statusCode: 200,
      message: 'Task Updated Successfully',
    };
  }

  async getTaskById(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      relations: ['ticket'],
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async deleteTaskById(taskId: number) {
    const result = await this.taskRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Task Deleted Successfully',
    };
  }
}
