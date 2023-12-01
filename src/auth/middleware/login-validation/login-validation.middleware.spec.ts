import { LoginValidationMiddleware } from './login-validation.middleware';

describe('LoginValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new LoginValidationMiddleware()).toBeDefined();
  });
});
