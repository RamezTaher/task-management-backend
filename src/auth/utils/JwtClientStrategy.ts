import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy, 'jwtclient') {
  constructor(private readonly clientService: ClientsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asasasasasasasasas',
    });
  }

  async validate(payload: any) {
    const user = await this.clientService.findClient(payload.sub);
    return user;
  }
}
