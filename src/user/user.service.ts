import { roleDto } from './dto/role.dto';
import { RoleEntity } from './../role/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RoleType } from '../graphql.schema'; //TODO Is it critical to have here in service layer such import?

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
      user.role = [{ id: citizen.id, role: citizen.role }];
      return user;
    }
    //TODO Need to solve problem with no existing role; Create error solver;
  }

  public async updateUser(userData: UpdateUserDto): Promise<UserEntity> {
    await this.usersRepository.update(
      { id: userData.id },
      {
        ...userData,
      },
    );
    return await this.getOneUser(userData.id);
  }

  public async addRole(roleData: roleDto): Promise<UserEntity> {
    const user = await this.getOneUser(roleData.userId);
    const roleName = await this.roleRepository.findOne(roleData.roleId);
    const roleExist = user.role.find((role) => role.role === roleName.role);
    if (!roleExist) {
      roleName.users = [user];
      await this.roleRepository.save(roleName);
      return {
        ...user,
        role: [...user.role, { id: roleName.id, role: roleName.role }],
      };
    }
    return user;
  }

  public async removeRole(roleData: roleDto): Promise<UserEntity> {
    const user = await this.getOneUser(roleData.userId);
    const roleName = await this.roleRepository.findOne(roleData.roleId);
    const roleExist = user.role.find((role) => role.role === roleName.role);
    if (roleExist) {
      roleName.users = [user];
      await this.roleRepository.delete(roleName);
      return {
        ...user,
        role: user.role.filter((role) => role.role !== roleName.role),
      };
    }
    return user;
  }

  public async deleteUsers(ids: string[]): Promise<string[]> {
    await this.usersRepository.delete(ids);
    return ids;
  }
}
