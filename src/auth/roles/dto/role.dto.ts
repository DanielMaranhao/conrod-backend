import { IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum.js';

export class RoleDto {
  @IsEnum(Role)
  readonly role: Role;
}
