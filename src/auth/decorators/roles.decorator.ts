import { Role } from '#/auth/roles/enums/role.enum.js';
import { NonEmptyArray } from '#/common/util/array.util.js';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (roles: NonEmptyArray<Role>) =>
  SetMetadata(ROLES_KEY, roles);
