import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PaymentInfoResolver } from './payment-info.resolver';
import { PaymentInfoService } from './payment-info.service';

@Module({
  providers: [PaymentInfoResolver, PaymentInfoService],
  imports: [TypeOrmModule.forFeature([UserEntity]), UserService],
})
export class PaymentInfoModule {}
