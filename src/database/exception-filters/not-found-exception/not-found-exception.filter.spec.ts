import { NotFoundExceptionFilter } from './not-found-exception.filter';

describe('NotFoundExceptionFilter', () => {
  it('should be defined', () => {
    expect(new NotFoundExceptionFilter()).toBeDefined();
  });
});
