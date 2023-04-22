import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import {
  ClientAuthGuard,
  ClientAuthenticatedGuard,
  ConsultantAuthGuard,
  ConsultantAuthenticatedGuard,
} from './utils/Guard';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { CreateConsultantDto } from './dtos/CreateConsultant.dto';
import { ClientsService } from 'src/clients/clients.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly consultantService: ConsultantsService,
    private readonly clientService: ClientsService,
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

  @UseGuards(ConsultantAuthGuard)
  @Post('consultant/login')
  loginConsultant(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @UseGuards(ClientAuthGuard)
  @Post('client/login')
  loginClient(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @Get('consultant/status')
  @UseGuards(ConsultantAuthenticatedGuard)
  async consultantStatus(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @Get('client/status')
  @UseGuards(ClientAuthenticatedGuard)
  async clientStatus(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @UseGuards(ConsultantAuthGuard)
  @Post('consultant/logout')
  consultantLogout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: any) => {
      if (err) {
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return res.sendStatus(HttpStatus.OK);
    });
  }

  @UseGuards(ClientAuthGuard)
  @Post('client/logout')
  clientLogout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: any) => {
      if (err) {
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return res.sendStatus(HttpStatus.OK);
    });
  }
}
