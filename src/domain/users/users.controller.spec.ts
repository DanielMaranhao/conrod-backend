import { faker } from '@faker-js/faker';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IdDto } from 'common/dto/id.dto';
import { MockClass, createMock } from 'testing/util/testing.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: MockClass<typeof UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    describe('when no error occurs', () => {
      it('should create a user', async () => {
        const id = 1;
        const createUserDto = genCreateDto();
        const expectedUser = genUser(id, createUserDto);

        service.create.mockResolvedValueOnce(expectedUser);

        const user = await controller.create(createUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate service exceptions', async () => {
        const createUserDto = genCreateDto();

        const exception = new ConflictException('Error creating user');
        service.create.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await controller.create(createUserDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBe(exception);
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [genUser(1), genUser(2)];

      service.findAll.mockResolvedValueOnce(expectedUsers);

      const users = await controller.findAll();

      expect(users).toBe(expectedUsers);
    });
  });

  describe('findOne', () => {
    describe('when user exists', () => {
      it('should return the user', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const expectedUser = genUser(id);

        service.findOne.mockResolvedValueOnce(expectedUser);

        const user = await controller.findOne(idDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;
        const idDto: IdDto = { id };

        const exception = new NotFoundException('User not found');
        service.findOne.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await controller.findOne(idDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBe(exception);
      });
    });
  });

  describe('update', () => {
    describe('when user exists', () => {
      it('should update the user', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const existingUser = genUser(id);
        const updateUserDto = genUpdateDto();
        const expectedUser = {
          ...existingUser,
          ...updateUserDto,
        } as User;

        service.update.mockResolvedValueOnce(expectedUser);

        const user = await controller.update(idDto, updateUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const updateUserDto = genUpdateDto();

        const exception = new NotFoundException('User not found');
        service.update.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await controller.update(idDto, updateUserDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBe(exception);
      });
    });
  });

  describe('remove', () => {
    describe('when user exists', () => {
      it('should remove the user', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const expectedUser = genUser(id);

        service.remove.mockResolvedValueOnce(expectedUser);

        const user = await controller.remove(idDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;
        const idDto: IdDto = { id };

        const exception = new NotFoundException('User not found');
        service.remove.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await controller.remove(idDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBe(exception);
      });
    });
  });
});

const genCreateDto = (): CreateUserDto => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  password: faker.internet.password(),
});

const genUpdateDto = (): UpdateUserDto => ({
  name: faker.person.firstName(),
});

const genUser = (id: number, createDto?: CreateUserDto) =>
  ({
    id,
    ...(createDto ?? genCreateDto()),
  }) as User;
