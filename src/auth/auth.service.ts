import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { LoginUserParams } from 'src/utils/types';
import { compare } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async validateUser(loginUserParams: LoginUserParams) {
    const user = await this.userService.findUser({
      email: loginUserParams.email,
    });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordCorrect = await compare(
      loginUserParams.password,
      user.password,
    );
    return isPasswordCorrect ? user : null;
  }
}
