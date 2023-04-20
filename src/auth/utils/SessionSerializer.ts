/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../utils/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
