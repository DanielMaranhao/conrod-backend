import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get() {
    return this.profileService.get();
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.profileService.update(updateUserDto);
  }

  @Delete()
  remove() {
    return this.profileService.remove();
  }
}
