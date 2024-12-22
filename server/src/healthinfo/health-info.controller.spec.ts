import { Test, TestingModule } from '@nestjs/testing';
import { HealthInfoController } from './health-info.controller';

describe('HealthInfoController', () => {
  let controller: HealthInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthInfoController],
    }).compile();

    controller = module.get<HealthInfoController>(HealthInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
