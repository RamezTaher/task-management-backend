import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ConsultantAuthGuard extends AuthGuard('consultant') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}

@Injectable()
export class ConsultantGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (user && user.role === 'consultant') {
      return true;
    }
    throw new UnauthorizedException(
      'You are not authorized to access this resource.',
    );
  }
}
@Injectable()
export class ClientGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (user && user.role === 'client') {
      return true;
    }
    throw new UnauthorizedException(
      'You are not authorized to access this resource.',
    );
  }
}
