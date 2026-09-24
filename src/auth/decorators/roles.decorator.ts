import { Role } from '#/auth/roles/enums/role.enum.js';
import { NonEmptyArray } from '#/common/util/array.util.js';
import { Reflector } from '@nestjs/core';

export type RolesParam = NonEmptyArray<Role> | false;

export const Roles = Reflector.createDecorator<RolesParam>();
