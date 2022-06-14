import { Test, TestingModule } from '@nestjs/testing';
import { PaymentInfoResolver } from './payment-info.resolver';

describe('PaymentInfoResolver', () => {
  let resolver: PaymentInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentInfoResolver],
    }).compile();

    resolver = module.get<PaymentInfoResolver>(PaymentInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
