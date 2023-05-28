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
  JwtAdminAuthGuard,
  JwtClientAuthGuard,
  JwtConsultantAuthGuard,
  LocalAdminAuthGuard,
  LocalClientAuthGuard,
  LocalConsultantAuthGuard,
} from './utils/Guard';
import { AdminsService } from 'src/admin/admins.service';
import { createAdminDto } from 'src/admin/dtos/CreateAdmin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly consultantService: ConsultantsService,
    private readonly clientService: ClientsService,
    private readonly adminService: AdminsService,
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
  @Post('admin/register')
  async registerAdmin(@Body() createAdminDto: createAdminDto) {
    return instanceToPlain(await this.adminService.createAdmin(createAdminDto));
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAdminAuthGuard)
  @Post('admin/login')
  loginAdmin(@Req() req: Request) {
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
  @UseGuards(JwtAdminAuthGuard)
  @Get('admin/status')
  getAdminProfile(@Req() req: Request) {
    return instanceToPlain(req.user);
  }
}
