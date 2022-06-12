import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { UserEntity } from '../user/entities/user.entity';
import { AuthEntity } from '../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity, AuthEntity])],
  providers: [RoleResolver, RoleService, AuthService, UserService, JwtService],
  exports: [RoleService],
})
export class RoleModule {}
