import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserEntity } from './../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
