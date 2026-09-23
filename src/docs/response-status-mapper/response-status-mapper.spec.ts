import { Test, TestingModule } from '@nestjs/testing';
import { ResponseStatusMapper } from './response-status-mapper.js';

describe('ResponseStatusMapper', () => {
  let provider: ResponseStatusMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseStatusMapper],
    }).compile();

    provider = module.get<ResponseStatusMapper>(ResponseStatusMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
