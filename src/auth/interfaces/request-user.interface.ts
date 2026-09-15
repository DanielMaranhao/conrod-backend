import { Role } from '#/auth/roles/enums/role.enum.js';

export interface RequestUser {
  readonly id: number;
  readonly role: Role;
}
