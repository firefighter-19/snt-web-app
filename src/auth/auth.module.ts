import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserEntity } from './../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthEntity]),
    forwardRef(() => UserModule),
    MailModule,
    JwtModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
