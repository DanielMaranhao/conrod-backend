import { CreateUserDto } from '#d/users/dto/create-user.dto.js';
import { PickType } from '@nestjs/swagger';

export class CredentialsDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
