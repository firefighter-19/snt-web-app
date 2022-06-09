import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
