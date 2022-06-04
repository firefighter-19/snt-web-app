import { RoleEntity } from './../role/entities/role.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { AddRoleDto } from './dto/addRole.dto';
import { RoleType } from '../graphql.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  public async getOneUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne(id, {
      relations: ['role'],
    });
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['role'],
    });
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.save({ ...userData });
    const citizen = await this.roleRepository.findOne({
      role: RoleType.CITIZEN,
    });
    citizen.users = [user];
    await this.roleRepository.save(citizen);
    user.role = [citizen.role];
    return user;
  }

  public async updateUser(userData: UpdateUserDto): Promise<UserEntity> {
    await this.usersRepository.update({ id: userData.id }, { ...userData });
    return await this.getOneUser(userData.id);
  }

  public async addRole(role: AddRoleDto): Promise<UserEntity> {
    const user = await this.getOneUser(role.userId);
    const roleName = await this.roleRepository.findOne(role.roleId, {
      relations: ['users'],
    });
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
