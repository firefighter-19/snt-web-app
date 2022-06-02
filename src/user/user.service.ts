import { UpdateUserInput } from './../graphql.schema';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getOneUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne(id);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({ ...userData });
  }

  public async updateUser(userData: UpdateUserInput): Promise<UserEntity> {
    await this.usersRepository.update({ id: userData.id }, { ...userData });
    return await this.getOneUser(userData.id);
  }

  public async deleteUsers(ids: string[]): Promise<string[]> {
    await this.usersRepository.delete(ids);
    return ids;
  }
}
