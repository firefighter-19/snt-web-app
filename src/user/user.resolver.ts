import { AuthGuard } from './../auth/auth.guard';
import { updateRoleDto } from '../role/dto/updateRole.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

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
  async updateUser(
    @Args('updateUser') userData: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(userData);
  }

  @Mutation(() => UserEntity)
  async deleteUsers(@Args('deleteUser') ids: string[]): Promise<string[]> {
    return await this.userService.deleteUsers(ids);
  }

  @Mutation(() => UserEntity)
  async addRole(@Args('addRole') roleData: updateRoleDto): Promise<UserEntity> {
    return await this.userService.addRole(roleData);
  }

  @Mutation(() => UserEntity)
  async removeRole(
    @Args('removeRole') roleData: updateRoleDto,
  ): Promise<UserEntity> {
    return await this.userService.removeRole(roleData);
  }
}
