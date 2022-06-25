import { InjectRepository } from '@nestjs/typeorm';
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
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

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
    const checkPassword = await compare(userData.password, user.password);
    if (user && checkPassword) {
      const tokens = this.generateUserToken(user);
      await this.authRepository.update(
        { id: user.id },
        {
          refreshToken: tokens.refreshToken,
          userId: user.id,
        },
      );
      const userToken = await this.authRepository.findOne({
        where: {
          userId: user.id,
        },
      });
      return {
        ...user,
        token: { ...userToken, accessToken: tokens.accessToken },
      };
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  public async registration(userData: CreateUserDto): Promise<UserEntity> {
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
    const userToken = await this.authRepository.save({
      refreshToken: tokens.refreshToken,
      userId: user.id,
    });
    return {
      ...user,
      token: { ...userToken, accessToken: tokens.accessToken },
    };
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

  public async validateAccessToken(accessToken: string): Promise<UserEntity> {
    try {
      const user = await this.jwtService.verify(accessToken, {
        secret: process.env.ACCESS_TOKEN,
      });
      return user;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }

  public async validateRefreshToken(refreshToken: string): Promise<Token> {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN,
      });
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
