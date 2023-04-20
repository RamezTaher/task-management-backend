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
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    return res.send(instanceToPlain(req.user));
  }
}
