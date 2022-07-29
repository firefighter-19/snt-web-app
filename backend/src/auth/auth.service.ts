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
      const userToken = await this.authRepository.findOne({
        where: {
          userId: user.id,
        },
      });
      await this.authRepository
        .createQueryBuilder()
        .update('auth')
        .set({ userId: user.id, refreshToken: tokens.refreshToken })
        .where('id = :id', { id: userToken.id })
        .execute();
      return {
        ...user,
        token: { ...userToken, refreshToken: tokens.refreshToken },
      };
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  public async registration(userData: CreateUserDto): Promise<UserEntity> {
    const userExist = await this.userService.getUserByEmail(userData.email);
    if (userExist) {
      throw new HttpException(
        `User with email ${userData.email} hash already exists`,
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
      token: { ...userToken, refreshToken: tokens.refreshToken },
    };
  }

  private generateUserToken(user: UserEntity): Token {
    const userInfo = { id: user.id, email: user.email, role: user.role };
    return {
      refreshToken: this.jwtService.sign(userInfo, {
        secret: process.env.PRIVATE_TOKEN || 'PRIVATE',
        expiresIn: '14d',
      }),
    };
  }

  public async validateRefreshToken(refreshToken: string): Promise<UserEntity> {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.PRIVATE_TOKEN || '',
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }
      const tokens = this.generateUserToken(user);
      user.refreshToken = tokens.refreshToken;

      await this.authRepository
        .createQueryBuilder()
        .update('auth')
        .set({ userId: user.id, refreshToken: tokens.refreshToken })
        .where('id = :id', { id: user.id })
        .execute();

      const updatedUser = await this.userService.getOneUser(user.id);
      return {
        ...updatedUser,
        token: { ...user, refreshToken: tokens.refreshToken },
      };
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
