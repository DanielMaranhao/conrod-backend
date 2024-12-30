import { faker } from '@faker-js/faker';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock, MockRepository } from 'testing/util/testing.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when no error occurs', () => {
      it('should create a user', async () => {
        const id = 1;
        const createUserDto = genCreateDto();
        const expectedUser = genUser(id, createUserDto);

        repository.create.mockReturnValueOnce(createUserDto as User);
        repository.save.mockResolvedValueOnce(expectedUser);

        const user = await service.create(createUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate exceptions', async () => {
        const createUserDto = genCreateDto();

        const exception = new ConflictException('Error creating user');
        repository.create.mockReturnValueOnce(createUserDto as User);
        repository.save.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await service.create(createUserDto);
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

      repository.find.mockResolvedValueOnce(expectedUsers);

      const users = await service.findAll();

      expect(users).toBe(expectedUsers);
    });
  });

  describe('findOne', () => {
    describe('when user exists', () => {
      it('should return the user', async () => {
        const id = 1;
        const expectedUser = genUser(id);

        repository.findOneByOrFail.mockResolvedValueOnce(expectedUser);

        const user = await service.findOne(id);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;

        const exception = new NotFoundException('User not found');
        repository.findOneByOrFail.mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await service.findOne(id);
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
        const existingUser = genUser(id);
        const updateUserDto = genUpdateDto();
        const expectedUser = {
          ...existingUser,
          ...updateUserDto,
        } as User;

        repository.preload.mockResolvedValueOnce(expectedUser);
        repository.save.mockResolvedValueOnce(expectedUser);

        const user = await service.update(id, updateUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the adequate exception', async () => {
        const id = 1;
        const updateUserDto = genUpdateDto();

        const exception = new NotFoundException('User not found');

        let error: Error;

        try {
          await service.update(id, updateUserDto);
        } catch (err) {
          error = err;
        }

        expect(error).toEqual(exception);
      });
    });
  });

  describe('remove', () => {
    describe('when user exists', () => {
      it('should remove the user', async () => {
        const id = 1;
        const expectedUser = genUser(id);

        jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedUser);
        repository.remove.mockResolvedValueOnce(expectedUser);

        const user = await service.remove(id);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;

        const exception = new NotFoundException('User not found');
        jest.spyOn(service, 'findOne').mockRejectedValueOnce(exception);

        let error: Error;

        try {
          await service.remove(id);
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

const genUser = (id: number, createDto = genCreateDto()) =>
  ({
    id,
    ...createDto,
  }) as User;
