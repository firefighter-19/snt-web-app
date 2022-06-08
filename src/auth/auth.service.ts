import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './../user/user.entity';
import { CreateUserDto } from './../user/dto/createUser.dto';
import { UserService } from './../user/user.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { LoginUser, Token } from '../graphql.schema';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async loginUser(userData: LoginUser): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(userData.email);
    const checkPassword = await compare(user.password, userData.password);

    if (user && checkPassword) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  public async registration(userData: CreateUserDto): Promise<Token> {
    const userExist = await this.userService.getUserByEmail(userData.email);
    if (userExist) {
      throw new HttpException(
        `User with email ${userData.email}hash already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(userData.password, 5);
    const user = await this.userService.createUser({
      ...userData,
      password: hashPassword,
    });

    const tokens = this.generateUserToken(user);
    await this.authRepository.save({
      refreshToken: tokens.refreshToken,
      userId: user.id,
    });
    return tokens;
  }

  private generateUserToken(user: UserEntity): Token {
    const userInfo = { id: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(userInfo, {
        secret: process.env.ACCESS_TOKEN || 'ACCESS',
        expiresIn: '1h',
      }),
      refreshToken: this.jwtService.sign(userInfo, {
        secret: process.env.REFRESH_TOKEN || 'PRIVATE',
        expiresIn: '30d',
      }),
    };
  }

  public validateAccessToken(accessToken: string): UserEntity {
    try {
      const user = this.jwtService.verify(accessToken);
      return user;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }

  public async validateRefreshToken(refreshToken: string): Promise<Token> {
    try {
      const user = this.jwtService.verify(refreshToken);
      if (!user) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      const tokens = this.generateUserToken(user);
      user.refreshToken = tokens.refreshToken;
      await this.authRepository.update({ id: user.id }, { ...user });
      return tokens;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
