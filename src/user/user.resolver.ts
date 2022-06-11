import { AuthGuard } from './../auth/auth.guard';
import { updateRoleDto } from '../role/dto/updateRole.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../auth/auth-role.decorator';
import { AuthRoleGuard } from '../auth/auth-role.guard';
import { RoleType } from '../graphql.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthGuard)
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
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthRoleGuard)
  async deleteUsers(@Args('deleteUser') ids: string[]): Promise<string[]> {
    return await this.userService.deleteUsers(ids);
  }

  @Mutation(() => UserEntity)
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthRoleGuard)
  async addRole(@Args('addRole') roleData: updateRoleDto): Promise<UserEntity> {
    return await this.userService.addRole(roleData);
  }

  @Mutation(() => UserEntity)
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthRoleGuard)
  async removeRole(
    @Args('removeRole') roleData: updateRoleDto,
  ): Promise<UserEntity> {
    return await this.userService.removeRole(roleData);
  }
}
