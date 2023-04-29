import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtConsultantAuthGuard } from 'src/auth/utils/Guard';
import { instanceToPlain } from 'class-transformer';
import { CreateTaskDto } from './dtos/CreateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(JwtConsultantAuthGuard)
  @Post('')
  async CreateIntervention(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }
}
