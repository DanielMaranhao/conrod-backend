import { ExtendedClsStore } from '#/als/interfaces/cls-store.interface.js';
import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { UsersService } from '#d/users/users.service.js';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cls: ClsService<ExtendedClsStore>,
  ) {}

  get() {
    const { id } = this.cls.get('user');
    return this.usersService.findOne(id);
  }

  update(updateUserDto: UpdateUserDto) {
    const { id } = this.cls.get('user');
    return this.usersService.update(id, updateUserDto);
  }

  remove() {
    const { id } = this.cls.get('user');
    return this.usersService.remove(id, true);
  }
}
