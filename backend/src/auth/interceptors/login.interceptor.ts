import { UserEntity } from './../../user/entities/user.entity';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<UserEntity> {
    const ctx = GqlExecutionContext.create(context);
    const response: Response = ctx.getContext().res;
    return next.handle().pipe(
      tap((data: UserEntity) => {
        response.setHeader('X-Auth-Token', `Bearer ${data.token.refreshToken}`);
      }),
    );
  }
}
