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
import { AuthService } from '../auth.service';

interface QueryFields {
  res: Response;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<UserEntity> {
    const ctx = GqlExecutionContext.create(context);
    const { res: response }: QueryFields = ctx.getContext();
    return next.handle().pipe(
      tap((data: UserEntity) => {
        response.setHeader('X-Auth-Token', `Bearer ${data.token.refreshToken}`);
      }),
    );
  }
}
