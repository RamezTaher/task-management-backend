import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConsultantsService } from 'src/consultants/consultants.service';

import { compare } from 'src/utils/helpers';
import { LoginConsultantParams } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(private readonly consultantService: ConsultantsService) {}
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
}
