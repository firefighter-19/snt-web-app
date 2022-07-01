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
import { add } from 'date-fns';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const response: Response = ctx.getContext().res;
    return next.handle().pipe(
      tap((data: UserEntity) => {
        response.cookie(
          'refreshToken',
          JSON.stringify(data.token.refreshToken),
          {
            httpOnly: true,
            secure: true,
            expires: add(new Date(), {
              days: 30,
            }),
          },
        );
      }),
    );
  }
}
