import { AuthService } from './auth.service';
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

  public async validateRequest(request: Request): Promise<any> {
    try {
      const headerData = request.headers.authorization;
      const [bearer, accessToken] = headerData.split(' ');
      const refreshToken = '';
      const verifyTokens = await this.authService.validateTokens(
        accessToken,
        refreshToken,
      );
      if (!verifyTokens && bearer !== 'Bearer') {
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
