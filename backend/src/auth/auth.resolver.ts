import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUser, Token } from '../graphql.schema';
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/login.interceptor';
import { Request } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => Token)
  async validateToken(@Context() req: Request): Promise<Token> {
    const refreshToken: string = req.cookies || '';
    return await this.authService.validateRefreshToken(refreshToken);
  }
  @Mutation(() => UserEntity)
  @UseInterceptors(LoggingInterceptor)
  async loginUser(@Args('userData') userData: LoginUser): Promise<UserEntity> {
    return await this.authService.loginUser(userData);
  }

  @Mutation(() => UserEntity)
  @UseInterceptors(LoggingInterceptor)
  async registration(
    @Args('createUser')
    userData: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.authService.registration(userData);
  }
}
