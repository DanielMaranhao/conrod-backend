import { ValidationMiddleware } from './validation.middleware.js';

describe('LoginValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidationMiddleware()).toBeDefined();
  });
});
