import { AuthModule } from './../auth/auth.module';
import { RoleService } from './../role/role.service';
import { RoleEntity } from './../role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, UserResolver, RoleService],
  exports: [UserService],
})
export class UserModule {}
