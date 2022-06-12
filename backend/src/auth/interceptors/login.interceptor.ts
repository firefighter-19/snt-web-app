import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import { Token } from '../../graphql.schema';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Token>,
  ): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const response: Response = ctx.getContext().res;
    return next.handle().pipe(
      tap((data: Token) => {
        response.cookie('refreshToken', JSON.stringify(data.refreshToken), {
          httpOnly: true,
        });
      }),
    );
  }
}
