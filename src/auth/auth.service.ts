import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admin/admins.service';
import { ClientsService } from 'src/clients/clients.service';
import { ConsultantsService } from 'src/consultants/consultants.service';

import { compare } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly consultantService: ConsultantsService,
    private readonly jwtService: JwtService,

    private readonly clientService: ClientsService,
    private readonly adminService: AdminsService,
  ) {}
  async validateConsultant(loginConsultantParams: any) {
    const user = await this.consultantService.findConsultant({
      email: loginConsultantParams.email,
    });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordCorrect = await compare(
      loginConsultantParams.password,
      user.password,
    );
    return isPasswordCorrect ? user : null;
  }
  async validateClient(loginClientParams: any) {
    const user = await this.clientService.findClient({
      email: loginClientParams.email,
    });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordCorrect = await compare(
      loginClientParams.password,
      user.password,
    );
    return isPasswordCorrect ? user : null;
  }

  async validateAdmin(loginAdminParams: any) {
    const admin = await this.adminService.findAdmin({
      email: loginAdminParams.email,
    });

    if (!admin)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordCorrect = await compare(
      loginAdminParams.password,
      admin.password,
    );
    return isPasswordCorrect ? admin : null;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
