import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ConsultantsService } from 'src/consultants/consultants.service';

@Injectable()
export class JwtConsultantStrategy extends PassportStrategy(
  Strategy,
  'jwtconsultant',
) {
  constructor(private readonly consultantService: ConsultantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asasasasasasasasas',
    });
  }

  async validate(payload: any) {
    const user = await this.consultantService.findConsultant(payload.sub);
    return user;
  }
}
