import { UserEntity } from './user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => UserEntity)
  async getUser(@Args('getUser') id: string): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') userData: CreateUserDto,
  ): Promise<UserEntity | string> {
    return await this.userService.createUser(userData);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') userData: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(userData);
  }

  @Mutation(() => UserEntity)
  async deleteUsers(@Args('deleteUser') ids: string[]): Promise<string[]> {
    return await this.userService.deleteUsers(ids);
  }
}
