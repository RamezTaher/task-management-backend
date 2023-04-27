import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class ClientStrategy extends PassportStrategy(Strategy, 'client') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const client = this.authService.validateClient({ email, password });
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
