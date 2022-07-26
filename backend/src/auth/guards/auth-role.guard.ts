import { AuthService } from '../auth.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { ROLES_KEY } from '../auth-role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRoleGuard {
  constructor(private authService: AuthService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    return this.validateRequest(request, requiredRoles);
  }

  public async validateRequest(
    request: Request,
    requiredRoles: string[],
  ): Promise<boolean> {
    try {
      const refreshToken = request.headers.authorization;
      const user = await this.authService.validateRefreshToken(refreshToken);
      if (!user) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      return user.role.some((role) => requiredRoles.includes(role.role));
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
