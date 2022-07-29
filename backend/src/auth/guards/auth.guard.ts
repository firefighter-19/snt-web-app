import { AuthService } from '../auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface QueryFields {
  req: Request;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req: request }: QueryFields = ctx.getContext();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    try {
      const [bearer, token] = request.headers['x-auth-token']
        .toString()
        .split(' ');
      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      await this.authService.validateRefreshToken(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
