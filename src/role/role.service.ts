import { CreateRoleDto } from './dto/createRole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    const roleExist = await this.roleRepository.findOne(role);
    if (!roleExist) {
      return await this.roleRepository.save({ ...role });
    }
    return roleExist;
  }

  async getRole(roleId: string): Promise<RoleEntity> {
    return this.roleRepository.findOne(roleId, {
      relations: ['users'],
    });
  }
}
