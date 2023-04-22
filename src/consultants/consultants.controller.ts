import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultantsService } from './consultants.service';

@Controller('Consultants')
export class ConsultantsController {
  constructor(private readonly ConsultantsService: ConsultantsService) {}
}
