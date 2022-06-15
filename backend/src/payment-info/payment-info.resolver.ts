import { PaymentInfoEntity } from './entities/payment-info.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { readFile, read } from 'xlsx';
import { Get } from '@nestjs/common';

@Resolver()
export class PaymentInfoResolver {
  // @Mutation(() => PaymentInfoEntity)
  // async savePaymentInfo(
  //   @Args('addPaymentData') paymentData: PaymentInfoEntity,
  // ): Promise<any> {
  //   console.log('12 ===========>: ', 12);
  // }

  // @Query()
  // async getData(): Promise<any> {
  //   const data = await (
  //     await fetch(
  //       'https://docs.google.com/spreadsheets/d/1zpauUmC4wutS2hYnGESMlzDGLztT_VTD/edit?usp=sharing&ouid=101133978712993095005&rtpof=true&sd=true',
  //     )
  //   ).arrayBuffer();
  //   const changed = read(data);
  //   console.log('changed ===========>: ', changed);
  // }

  @Get('/someData')
  async getData(): Promise<any> {
    const data = await (
      await fetch(
        'https://docs.google.com/spreadsheets/d/1zpauUmC4wutS2hYnGESMlzDGLztT_VTD/edit?usp=sharing&ouid=101133978712993095005&rtpof=true&sd=true',
      )
    ).arrayBuffer();
    const changed = read(data);
    console.log('changed ===========>: ', changed);
  }
}
