import { UserEntity } from './../user/user.entity';
import { AuthService } from './auth.service';
import { Get } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { Token } from '../graphql.schema';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // @Get()
  // async loginUser(@Args('login') token: string): Promise<UserEntity> {
  //   return await this.authService.login(token);
  // }

  @Mutation()
  async registration(
    @Args('createUser') userData: CreateUserDto,
  ): Promise<Token> {
    return await this.authService.registration(userData);
  }
}
