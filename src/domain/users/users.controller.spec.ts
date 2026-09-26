import { IdDto } from '#/common/dto/id.dto.js';
import { UserFactory } from '#/testing/factories/user.factory.js';
import { MockClass, createMock } from '#/testing/util/testing.util.js';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;
  let service: MockClass<typeof UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: createMock() }],
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
        const createUserDto = UserFactory.createDto();
        const expectedUser = UserFactory.user(id, createUserDto);

        service.create.mockResolvedValueOnce(expectedUser);

        const user = await controller.create(createUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate service exceptions', async () => {
        const createUserDto = UserFactory.createDto();

        const exception = new ConflictException('Error creating user');
        service.create.mockRejectedValueOnce(exception);

        const resultFn = () => controller.create(createUserDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [UserFactory.user(1), UserFactory.user(2)];

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
        const expectedUser = UserFactory.user(id);

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

        const resultFn = () => controller.findOne(idDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('update', () => {
    describe('when user exists', () => {
      it('should update the user', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const existingUser = UserFactory.user(id);
        const updateUserDto = UserFactory.updateDto();
        const expectedUser = { ...existingUser, ...updateUserDto } as User;

        service.update.mockResolvedValueOnce(expectedUser);

        const user = await controller.update(idDto, updateUserDto);

        expect(user).toBe(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should propagate the exception', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const updateUserDto = UserFactory.updateDto();

        const exception = new NotFoundException('User not found');
        service.update.mockRejectedValueOnce(exception);

        const resultFn = () => controller.update(idDto, updateUserDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });

  describe('remove', () => {
    describe('when user exists', () => {
      it('should remove the user', async () => {
        const id = 1;
        const idDto: IdDto = { id };
        const expectedUser = UserFactory.user(id);

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

        const resultFn = () => controller.remove(idDto);
        await expect(resultFn).rejects.toThrow(exception);
      });
    });
  });
});
