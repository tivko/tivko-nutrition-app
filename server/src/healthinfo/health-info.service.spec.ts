import { Test, TestingModule } from '@nestjs/testing';
import { HealthInfoService } from './health-info.service';

describe('HealthInfoService', () => {
  let service: HealthInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthInfoService],
    }).compile();

    service = module.get<HealthInfoService>(HealthInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
