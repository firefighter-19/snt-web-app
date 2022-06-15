import { PaymentInfoEntity } from './entities/payment-info.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PaymentInfoResolver } from './payment-info.resolver';
import { PaymentInfoService } from './payment-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PaymentInfoEntity])],
  providers: [PaymentInfoResolver, PaymentInfoService],
})
export class PaymentInfoModule {}
