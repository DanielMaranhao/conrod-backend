import { CreateUserDto } from '#d/users/dto/create-user.dto.js';
import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { User } from '#d/users/entities/user.entity.js';
import { faker } from '@faker-js/faker';

export class UserFactory {
  static createDto() {
    const createDto: CreateUserDto = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: '85988888888',
      password: 'Pass123!',
    };
    return createDto;
  }

  static updateDto() {
    const updateDto: UpdateUserDto = {
      name: faker.person.firstName(),
    };
    return updateDto;
  }

  static user(id: number, createDto = this.createDto()) {
    const user = { id, ...createDto } as User;
    return user;
  }
}
