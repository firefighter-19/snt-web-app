import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUser, Token } from '../graphql.schema';
import { UseInterceptors } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoggingInterceptor } from './interceptors/login.interceptor';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserEntity)
  @UseInterceptors(LoggingInterceptor)
  async loginUser(@Args('userData') userData: LoginUser): Promise<Token> {
    return await this.authService.loginUser(userData);
  }

  @Mutation(() => Token)
  @UseInterceptors(LoggingInterceptor)
  async registration(
    @Args('createUser')
    userData: CreateUserDto,
  ): Promise<Token> {
    return await this.authService.registration(userData);
  }
}
