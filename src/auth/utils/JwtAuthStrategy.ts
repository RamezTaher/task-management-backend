import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ConsultantsService } from 'src/consultants/consultants.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwtauth') {
  constructor(
    private readonly clientService: ClientsService,
    private readonly consultantService: ConsultantsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asasasasasasasasas',
    });
  }

  async validate(payload: any) {
    const user = await this.clientService.findClient(payload.sub);
    if (!user) {
      const user = await this.consultantService.findConsultant(payload.sub);
      return user;
    }
    return user;
  }
}
