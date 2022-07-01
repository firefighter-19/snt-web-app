import { updateRoleDto } from '../role/dto/updateRole.dto';
import { RoleEntity } from './../role/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RoleType } from '../graphql.schema'; //TODO Is it critical to have here in service layer such import?
import { UserEntity } from './entities/user.entity';

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
      relations: ['role', 'token'],
    });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['role', 'token'],
    });
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['role', 'token'],
    });
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const citizen = await this.roleRepository.findOne({
      role: RoleType.CITIZEN,
    });
    if (citizen) {
      const user = await this.usersRepository.save({ ...userData });
      citizen.users = [user];
      await this.roleRepository.save(citizen);
      return this.getOneUser(user.id);
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

  public async addRole(roleData: updateRoleDto): Promise<UserEntity> {
    const [user, roleName] = await Promise.all([
      this.getOneUser(roleData.userId),
      this.roleRepository.findOne(roleData.roleId),
    ]);
    const roleExist = user.role.find((role) => role.role === roleName.role);
    if (!roleExist) {
      roleName.users = [user];
      await this.roleRepository.save(roleName);
      return this.getOneUser(user.id);
    }
    return user;
  }

  public async removeRole(roleData: updateRoleDto): Promise<UserEntity> {
    const [user, roleName] = await Promise.all([
      this.getOneUser(roleData.userId),
      this.roleRepository.findOne(roleData.roleId),
    ]);
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
