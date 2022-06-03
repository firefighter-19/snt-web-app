import { RoleEntity } from './../role/entities/role.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { AddRoleDto } from './dto/addRole.dto';

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
    return await this.usersRepository.save({ ...userData });
  }

  public async updateUser(userData: UpdateUserDto): Promise<UserEntity> {
    await this.usersRepository.update({ id: userData.id }, { ...userData });
    return await this.getOneUser(userData.id);
  }

  public async addRole(role: AddRoleDto): Promise<any> {
    const user = await this.getOneUser(role.userId);
    const roleName = await this.roleRepository.findOne(role.roleId, {
      relations: ['users'],
    });

    roleName.users = [user];
    await this.roleRepository.save(roleName);

    // const result = await this.usersRepository.save({
    //   ...user,
    //   role: [roleName.role],
    // });
  }

  public async deleteUsers(ids: string[]): Promise<string[]> {
    await this.usersRepository.delete(ids);
    return ids;
  }
}
