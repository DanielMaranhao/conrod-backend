import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { UsersService } from '#d/users/users.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  get(id: number) {
    return this.usersService.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersService.remove(id, true);
  }
}
