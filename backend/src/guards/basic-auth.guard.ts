import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BasicAuthConfig } from 'src/modules/configs/auth.config';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly basicAuthConfig: BasicAuthConfig) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization type');
    }

    const [user, pass] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    if (
      user === this.basicAuthConfig.authUser &&
      pass === this.basicAuthConfig.authPassword
    ) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
