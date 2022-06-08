import { AuthService } from './auth.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;
    return this.validateRequest(request);
  }

  public async validateRequest(request: any): Promise<any> {
    try {
      const result = request.headers.authorization;
      // const bearer = result.split(' ')[0];
      // const token = result.split(' ')[1];
      console.log(result);
      // if (bearer !== 'Bearer' || !token) {
      //   throw new UnauthorizedException({
      //     message: 'User is not authorized',
      //   });
      // }
      // const user = this.jwtService.verify(token);
      // console.log('user ===========>: ', user);
      // return true;
    } catch (e) {
      console.log('e ===========>: ', e);
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
