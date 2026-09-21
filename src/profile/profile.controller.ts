import { User } from '#/auth/decorators/user.decorator.js';
import { type AuthUser } from '#/auth/interfaces/auth-user.interface.js';
import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@User() { id }: AuthUser) {
    return this.profileService.get(id);
  }

  @Patch()
  update(@User() { id }: AuthUser, @Body() updateUserDto: UpdateUserDto) {
    return this.profileService.update(id, updateUserDto);
  }

  @Delete()
  remove(@User() { id }: AuthUser) {
    return this.profileService.remove(id);
  }
}
