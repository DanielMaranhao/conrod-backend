import { NotFoundExceptionFilter } from './not-found-exception.filter.js';

describe('NotFoundExceptionFilter', () => {
  it('should be defined', () => {
    expect(new NotFoundExceptionFilter()).toBeDefined();
  });
});
