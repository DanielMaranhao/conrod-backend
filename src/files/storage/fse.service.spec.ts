import { Test, TestingModule } from '@nestjs/testing';
import { FseService } from './fse.service';

describe('FseService', () => {
  let service: FseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FseService],
    }).compile();

    service = module.get<FseService>(FseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
