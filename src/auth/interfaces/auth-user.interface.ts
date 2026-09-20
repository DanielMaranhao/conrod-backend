import { Role } from '#/auth/roles/enums/role.enum.js';

export interface AuthUser {
  readonly id: number;
  readonly role: Role;
}
