import { Test, TestingModule } from '@nestjs/testing';
import { FilteringService } from './filtering.service';

describe('FilteringService', () => {
  let service: FilteringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilteringService],
    }).compile();

    service = module.get<FilteringService>(FilteringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
