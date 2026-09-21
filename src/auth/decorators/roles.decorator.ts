import { Role } from '#/auth/roles/enums/role.enum.js';
import { NonEmptyArray } from '#/common/util/array.util.js';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type RolesParam = NonEmptyArray<Role> | false;

export const Roles = (roles: RolesParam) => SetMetadata(ROLES_KEY, roles);
