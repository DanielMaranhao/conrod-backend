import { AuthUser } from '#/auth/interfaces/auth-user.interface.js';
import { ClsStore } from 'nestjs-cls';

export interface ExtendedClsStore extends ClsStore {
  readonly user: AuthUser;
}
