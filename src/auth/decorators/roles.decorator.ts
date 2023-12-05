import { SetMetadata } from '@nestjs/common';
import { Role } from 'auth/roles/enums/role.enum';
import { NonEmptyArray } from 'common/util/array.util';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: NonEmptyArray<Role>) =>
  SetMetadata(ROLES_KEY, roles);
