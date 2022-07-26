import { AuthService } from '../auth.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return this.validateRequest(request);
  }

  public async validateRequest(request: Request): Promise<boolean> {
    try {
      const refreshToken = request.headers.authorization;
      const verifyAccess = await this.authService.validateRefreshToken(
        refreshToken,
      );
      if (!verifyAccess) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
