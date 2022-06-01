import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../graphql.schema';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  public async createUser(userData: CreateUserDto) {
    const user = await this.usersRepository.save(userData);
    return user;
  }
}
