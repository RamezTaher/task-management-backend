import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthentificatedStrategy extends PassportStrategy(
  Strategy,
  'authentificated',
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const client = this.authService.validateClient({ email, password });
    if (!client) {
      const consultant = this.authService.validateConsultant({
        email,
        password,
      });
      if (!consultant) {
        throw new UnauthorizedException();
      }
      return consultant;
    }
    return client;
  }
}
