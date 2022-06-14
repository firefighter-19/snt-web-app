import { Test, TestingModule } from '@nestjs/testing';
import { PaymentInfoService } from './payment-info.service';

describe('PaymentInfoService', () => {
  let service: PaymentInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentInfoService],
    }).compile();

    service = module.get<PaymentInfoService>(PaymentInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
