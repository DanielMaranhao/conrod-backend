import { UserFactory } from '#/testing/factories/user.factory.js';
import { createMock, MockRepository } from '#/testing/util/testing.util.js';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: createMock() },
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
        const createUserDto = UserFactory.createDto.build();
        const expectedUser = UserFactory.user.build({ id, ...createUserDto });

        repository.create.mockReturnValueOnce(createUserDto as User);
        repository.save.mockResolvedValueOnce(expectedUser);

        const user = await service.create(createUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate exceptions', async () => {
        const createUserDto = UserFactory.createDto.build();

        const exception = new ConflictException('Error creating user');
        repository.create.mockReturnValueOnce(createUserDto as User);
        repository.save.mockRejectedValueOnce(exception);

        const resultFn = () => service.create(createUserDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        UserFactory.user.build({ id: 1 }),
        UserFactory.user.build({ id: 2 }),
      ];

      repository.find.mockResolvedValueOnce(expectedUsers);

      const users = await service.findAll();

      expect(users).toBe(expectedUsers);
    });
  });

  describe('findOne', () => {
    describe('when user exists', () => {
      it('should return the user', async () => {
        const id = 1;
        const expectedUser = UserFactory.user.build({ id });

        repository.findOneByOrFail.mockResolvedValueOnce(expectedUser);

        const user = await service.findOne(id);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;

        const exception = new NotFoundException(`User #${id} not found`);
        repository.findOneByOrFail.mockRejectedValueOnce(exception);

        const resultFn = () => service.findOne(id);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('update', () => {
    describe('when user exists', () => {
      it('should update the user', async () => {
        const id = 1;
        const existingUser = UserFactory.user.build({ id });
        const updateUserDto = UserFactory.updateDto.build();
        const expectedUser = UserFactory.user.build({
          ...existingUser,
          ...updateUserDto,
        });

        repository.preload.mockResolvedValueOnce(expectedUser);
        repository.save.mockResolvedValueOnce(expectedUser);

        const user = await service.update(id, updateUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the adequate exception', async () => {
        const id = 1;
        const updateUserDto = UserFactory.updateDto.build();

        const exception = new NotFoundException(`User #${id} not found`);

        const resultFn = () => service.update(id, updateUserDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('remove', () => {
    describe('when user exists', () => {
      it('should remove the user', async () => {
        const id = 1;
        const expectedUser = UserFactory.user.build({ id });

        vi.spyOn(service, 'findOne').mockResolvedValueOnce(expectedUser);
        repository.remove.mockResolvedValueOnce(expectedUser);

        const user = await service.remove(id);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;

        const exception = new NotFoundException(`User #${id} not found`);
        vi.spyOn(service, 'findOne').mockRejectedValueOnce(exception);

        const resultFn = () => service.remove(id);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });
});
