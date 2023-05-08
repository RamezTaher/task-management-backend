import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ConsultantsService } from 'src/consultants/consultants.service';
import { AdminsService } from 'src/admin/admins.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwtadmin') {
  constructor(private readonly adminService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asasasasasasasasas',
    });
  }

  async validate(payload: any) {
    const user = await this.adminService.findAdmin(payload.sub);
    return user;
  }
}
