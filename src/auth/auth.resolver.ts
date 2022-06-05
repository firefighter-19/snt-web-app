import { UserEntity } from './../user/user.entity';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUser, Token } from '../graphql.schema';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserEntity)
  async loginUser(@Args('userData') userData: LoginUser): Promise<UserEntity> {
    return await this.authService.loginUser(userData);
  }

  @Mutation()
  async registration(
    @Args('createUser') userData: CreateUserDto,
  ): Promise<Token> {
    return await this.authService.registration(userData);
  }
}
