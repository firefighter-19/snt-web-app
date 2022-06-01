import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../graphql.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUsers')
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Mutation('createUser')
  async createUser(
    @Args('createUserInput') userData: CreateUserDto,
  ): Promise<User> {
    const createdUser = await this.userService.createUser(userData);
    return createdUser;
  }
}
