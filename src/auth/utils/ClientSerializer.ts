/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ClientsService } from 'src/clients/clients.service';

import { Client } from 'src/utils/typeorm';

@Injectable()
export class ClientSerializer extends PassportSerializer {
  constructor(private readonly clientService: ClientsService) {
    super();
  }
  serializeUser(user: Client, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: Client, done: Function) {
    const userDb = await this.clientService.findClient({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
