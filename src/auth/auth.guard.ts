import { JwtService } from '@nestjs/jwt';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  // getRequest(context: ExecutionContext) {
  //   console.log('123 ===========>: ', 123);
  //   const ctx = GqlExecutionContext.create(context);
  //   const request = ctx.getContext().req;
  //   return this.validateRequest(request);
  // }

  validateRequest(request: Request): boolean {
    try {
      const result = request.headers.get('Authorization');
      const bearer = result.split(' ')[0];
      const token = result.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      const user = this.jwtService.verify(token);
      console.log('user ===========>: ', user);
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
