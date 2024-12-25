import { ValidationMiddleware } from './validation.middleware';

describe('LoginValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidationMiddleware()).toBeDefined();
  });
});
