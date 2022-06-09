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
    const request = ctx.getContext().req;
    return this.validateRequest(request);
  }

  public async validateRequest(request: any): Promise<any> {
    console.log('request ===========>: ', request.headers.authorization);
    try {
      const headerData = request.headers.authorization;
      console.log('request.http.headers ===========>: ', headerData);
      const [bearer, token] = headerData.split(' ');
      const verifyAccessToken = this.authService.validateAccessToken(token);
      // if (!verifyAccessToken) {
      //   const verifyRefreshToken = this.authService.validateRefreshToken(
      //     request.cookie('refreshToken'),
      //   );
      //   if (!verifyRefreshToken)
      //     throw new UnauthorizedException({
      //       message: 'User is not authorized',
      //     });
      //   const userData = this.authService.decodeRefreshToken(
      //     request.cookie('refreshToken'),
      //   );
      // }
    } catch (e) {
      console.log('e ===========>: ', e);
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
