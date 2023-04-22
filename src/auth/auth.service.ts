import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ConsultantsService } from 'src/consultants/consultants.service';

import { compare } from 'src/utils/helpers';
import { LoginClientParams, LoginConsultantParams } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly consultantService: ConsultantsService,

    private readonly clientService: ClientsService,
  ) {}
  async validateConsultant(loginConsultantParams: LoginConsultantParams) {
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
  async validateClient(loginClientParams: LoginClientParams) {
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
}
