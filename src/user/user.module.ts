import { RoleService } from './../role/role.service';
import { RoleEntity } from './../role/entities/role.entity';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService, UserResolver, RoleService],
})
export class UserModule {}
