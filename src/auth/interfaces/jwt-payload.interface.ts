import type { AuthUser } from './auth-user.interface.js';

export interface JwtPayload {
  readonly sub: AuthUser['id'];
}
