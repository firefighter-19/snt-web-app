import { AddRoleDto } from './dto/addRole.dto';
import { RoleEntity } from './../role/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { RoleType } from '../graphql.schema';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  public async getOneUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne(id);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const citizen = await this.roleRepository.findOne({
      role: RoleType.CITIZEN,
    });
    if (citizen) {
      const user = await this.usersRepository.save({ ...userData });
      citizen.users = [user];
      await this.roleRepository.save(citizen);
      user.role = [citizen.role];
      return user;
    }
    //TODO Need to solve problem with no existing role; Create error solver;
  }

  public async updateUser(userData: UpdateUserDto): Promise<UserEntity> {
    const user = Object.keys(userData).reduce((acc, cur) => {
      if (cur !== 'roleId') {
        acc[cur] = userData[cur];
      }
      return acc;
    }, {});
    await this.usersRepository.update(
      { id: userData.id },
      {
        ...user,
      },
    );
    return this.addRole({ userId: userData.id, roleId: userData.roleId });
  }

  private async addRole(userInfo: AddRoleDto): Promise<UserEntity> {
    const user = await this.getOneUser(userInfo.userId);
    const roleName = await this.roleRepository.findOne(userInfo.roleId);
    const roleExist = user.role.includes(roleName.role);
    if (!roleExist) {
      roleName.users = [user];
      await this.roleRepository.save(roleName);
      return { ...user, role: [...user.role, roleName.role] };
    }
    return user;
  }

  public async deleteUsers(ids: string[]): Promise<string[]> {
    await this.usersRepository.delete(ids);
    return ids;
  }
}
