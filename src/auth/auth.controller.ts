import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { instanceToPlain } from 'class-transformer';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { CreateConsultantDto } from './dtos/CreateConsultant.dto';
import { ClientsService } from 'src/clients/clients.service';
import { AuthService } from './auth.service';
import {
  JwtClientAuthGuard,
  JwtConsultantAuthGuard,
  LocalClientAuthGuard,
  LocalConsultantAuthGuard,
} from './utils/Guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly consultantService: ConsultantsService,
    private readonly clientService: ClientsService,
    private readonly authServices: AuthService,
  ) {}

  @Post('consultant/register')
  async registerConsultant(@Body() createConsultantDto: CreateConsultantDto) {
    return instanceToPlain(
      await this.consultantService.createConsultant(createConsultantDto),
    );
  }

  @Post('client/register')
  async registerClient(@Body() createConsultantDto: CreateConsultantDto) {
    return instanceToPlain(
      await this.clientService.createClient(createConsultantDto),
    );
  }
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalConsultantAuthGuard)
  @Post('consultant/login')
  loginConsultant(@Req() req: Request) {
    return this.authServices.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalClientAuthGuard)
  @Post('client/login')
  loginClient(@Req() req: Request) {
    return this.authServices.login(req.user);
  }

  @UseGuards(JwtClientAuthGuard)
  @Get('client/status')
  getClientProfile(@Req() req: Request) {
    return instanceToPlain(req.user);
  }
  @UseGuards(JwtConsultantAuthGuard)
  @Get('consultant/status')
  getConsultantProfile(@Req() req: Request) {
    return instanceToPlain(req.user);
  }
}
