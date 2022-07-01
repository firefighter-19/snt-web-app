import { UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUser } from '../graphql.schema';
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/login.interceptor';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

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
