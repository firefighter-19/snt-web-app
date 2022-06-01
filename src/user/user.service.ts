import { DeleteUserInput, UpdateUserInput } from './../graphql.schema';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../graphql.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  public async createUser(userData: CreateUserDto) {
    const user = await this.usersRepository.save(userData);
    return user;
  }

  public async updateUser(userData: UpdateUserInput) {
    await this.usersRepository.update(
      { userId: userData.userId },
      { ...userData },
    );
    return await this.getOneUser(userData.userId);
  }

  public async deleteUser(id: DeleteUserInput) {
    const userId = await this.usersRepository.delete(id);
    return userId;
  }
}
