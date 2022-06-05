import { UserEntity } from './../user/user.entity';
import { AuthService } from './auth.service';
import { Get } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  // @Get(() => UserEntity)
  // async loginUser(@Args('login') token: string): Promise<UserEntity> {
  //   return await this.authService.login(token);
  // }

  // @Mutation(() => UserEntity)
  // async registration();
}
