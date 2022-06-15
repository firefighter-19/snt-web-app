import { UserEntity } from './../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaymentInfoEntity } from './entities/payment-info.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentInfoService {
  constructor(
    @InjectRepository(PaymentInfoEntity)
    private paymentInfoRepository: Repository<PaymentInfoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // public convertDataToCSV(data: any) {}

  private async saveUserPayment(paymentData: PaymentInfoEntity[]) {
    const users = await this.userRepository.find();
    const paymentDataWithUsers = paymentData.reduce((acc, data) => {
      users.forEach((user) =>
        data.siteNumber === user.siteNumber
          ? acc.push({ ...data, user: user })
          : acc.push(data),
      );
      return acc;
    }, [] as PaymentInfoEntity[]);
    await this.paymentInfoRepository.save(paymentDataWithUsers);
  }
}
