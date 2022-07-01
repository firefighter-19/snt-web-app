import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleEntity } from './entities/role.entity';
import { UseGuards } from '@nestjs/common';
import { RoleType } from '../graphql.schema';
import { Roles } from '../auth/auth-role.decorator';
import { AuthRoleGuard } from '../auth/guards/auth-role.guard';

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RoleEntity)
  async getRole(@Args('getRole') roleId: string): Promise<RoleEntity> {
    return await this.roleService.getRole(roleId);
  }

  @Mutation(() => String)
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthRoleGuard)
  async createRole(
    @Args('createRole') role: CreateRoleDto,
  ): Promise<RoleEntity> {
    return await this.roleService.createRole(role);
  }
}
