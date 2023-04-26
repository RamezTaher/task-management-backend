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
import { AuthGuard } from './utils/Guard';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { CreateConsultantDto } from './dtos/CreateConsultant.dto';
import { ClientsService } from 'src/clients/clients.service';
import { AuthService } from './auth.service';

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

  @Post('consultant/login')
  loginConsultant(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @Post('client/login')
  loginClient(@Req() req: Request, @Res() res: Response) {
    return this.authServices.login(req.user);
  }

  @UseGuards(AuthGuard)
  @Post('consultant/logout')
  consultantLogout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: any) => {
      if (err) {
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return res.sendStatus(HttpStatus.OK);
    });
  }

  @UseGuards(AuthGuard)
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
