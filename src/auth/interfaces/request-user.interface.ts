import { Role } from 'auth/roles/enums/role.enum';

export interface RequestUser {
  readonly id: number;
  readonly role: Role;
}
