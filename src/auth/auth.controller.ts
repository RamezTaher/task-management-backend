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
import { AuthenticatedGuard, ConsultantAuthGuard } from './utils/Guard';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { CreateConsultantDto } from './dtos/CreateConsultant.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly consultantService: ConsultantsService) {}

  @Post('consultant/register')
  async registerUser(@Body() createConsultantDto: CreateConsultantDto) {
    return instanceToPlain(
      await this.consultantService.createConsultant(createConsultantDto),
    );
  }

  @UseGuards(ConsultantAuthGuard)
  @Post('consultant/login')
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('consultant/status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }

  @UseGuards(ConsultantAuthGuard)
  @Post('consultant/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: any) => {
      if (err) {
        return res.send(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return res.send(HttpStatus.OK);
    });
  }
}
