import { IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RoleDto {
  @IsEnum(Role)
  readonly role: Role;
}
