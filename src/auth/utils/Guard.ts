import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalClientAuthGuard extends AuthGuard('client') {}
@Injectable()
export class LocalConsultantAuthGuard extends AuthGuard('consultant') {}
@Injectable()
export class LocalAdminAuthGuard extends AuthGuard('admin') {}

@Injectable()
export class JwtClientAuthGuard extends AuthGuard('jwtclient') {}
@Injectable()
export class JwtConsultantAuthGuard extends AuthGuard('jwtconsultant') {}
export class JwtAdminAuthGuard extends AuthGuard('jwtadmin') {}

export class JwtAuthGuard extends AuthGuard('jwtauth') {}
