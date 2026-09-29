import { CreateUserDto } from '#d/users/dto/create-user.dto.js';
import { UpdateUserDto } from '#d/users/dto/update-user.dto.js';
import { User } from '#d/users/entities/user.entity.js';
import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

export class UserFactory {
  static createDto = Factory.define<CreateUserDto>(() => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
  }));

  static updateDto = Factory.define<UpdateUserDto>(() => ({
    name: faker.person.firstName(),
  }));

  static user = Factory.define<User>(() => {
    const user = { ...UserFactory.createDto.build() } as User;
    return user;
  });
}
