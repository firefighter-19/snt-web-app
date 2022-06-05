import { Token } from './../graphql.schema';
import { UserEntity } from './../user/user.entity';
import { CreateUserDto } from './../user/dto/createUser.dto';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async registration(userData: CreateUserDto): Promise<Token> {
    const userExist = await this.userService.getUserByEmail(userData.email);
    if (userExist) {
      throw new HttpException(
        `User with email ${userData.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(userData.password, 5);
    const user = await this.userService.createUser({
      ...userData,
      password: hashPassword,
    });
    return await this.generateUserToken(user);
  }

  private async generateUserToken(user: UserEntity): Promise<Token> {
    const userInfo = { id: user.id, email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(userInfo),
    };
  }
}
