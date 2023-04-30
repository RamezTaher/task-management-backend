import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  JwtAuthGuard,
  JwtClientAuthGuard,
  JwtConsultantAuthGuard,
} from 'src/auth/utils/Guard';
import { CreateTaskDto } from './dtos/CreateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(JwtClientAuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @UseGuards(JwtConsultantAuthGuard)
  @Put(':id')
  async updateTask(@Param('id') taskId: number, @Body() updateTask: any) {
    return await this.taskService.updateTask(taskId, updateTask);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') taskId: number) {
    return await this.taskService.getTaskById(taskId);
  }

  @UseGuards(JwtClientAuthGuard)
  @Delete(':id')
  async deleteTaskById(@Param('id') taskId: number) {
    return await this.taskService.deleteTaskById(taskId);
  }
}
