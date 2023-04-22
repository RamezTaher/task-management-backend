/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { Consultant } from 'src/utils/typeorm';

@Injectable()
export class ConsultantSerializer extends PassportSerializer {
  constructor(private readonly consultantService: ConsultantsService) {
    super();
  }
  serializeUser(user: Consultant, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: Consultant, done: Function) {
    const userDb = await this.consultantService.findConsultant({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
