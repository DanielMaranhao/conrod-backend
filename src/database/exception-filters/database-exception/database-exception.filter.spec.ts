import { DatabaseExceptionFilter } from './database-exception.filter.js';

describe('DatabaseExceptionFilter', () => {
  it('should be defined', () => {
    expect(new DatabaseExceptionFilter()).toBeDefined();
  });
});
