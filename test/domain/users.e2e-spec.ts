import { Role } from '#/auth/roles/enums/role.enum.js';
import { VALIDATION_PIPE_OPTIONS } from '#/common/util/common.constants.js';
import { NotFoundExceptionFilter } from '#/database/exception-filters/not-found-exception/not-found-exception.filter.js';
import testDatabaseConfig from '#/testing/config/test-database.config.js';
import { UserFactory } from '#/testing/factories/user.factory.js';
import { TEST_ENV_VALIDATION_SCHEMA } from '#/testing/util/testing.constants.js';
import { User } from '#d/users/entities/user.entity.js';
import { UsersModule } from '#d/users/users.module.js';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { omit } from 'lodash';
import request from 'supertest';
import { App } from 'supertest/types.js';

describe('Users [/users]', () => {
  const createUserDto = UserFactory.createDto();
  const updateUserDto = UserFactory.updateDto();

  const expectedUser = {
    id: 1,
    ...omit(createUserDto, ['password']),
    role: Role.USER,
  } as const;

  let app: INestApplication<App>;
  let server: App;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          validationSchema: TEST_ENV_VALIDATION_SCHEMA,
          envFilePath: 'test/.env',
        }),
        TypeOrmModule.forRootAsync(testDatabaseConfig.asProvider()),
      ],
      providers: [
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
        },
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('Create [POST /]', async () => {
    const response = await request(server).post('/users').send(createUserDto);
    const { status } = response;
    const body = response.body as User;

    expect(status).toBe(HttpStatus.CREATED);
    expect(body).toMatchObject(expectedUser);
  });

  it('Find all [GET /]', async () => {
    const response = await request(server).get('/users');
    const { status } = response;
    const body = response.body as User[];

    expect(status).toBe(HttpStatus.OK);
    expect(body.length).toBe(1);
    expect(body[0]).toMatchObject(expectedUser);
  });

  it('Find one [GET /:id]', async () => {
    const response = await request(server).get('/users/1');
    const { status } = response;
    const body = response.body as User;

    expect(status).toBe(HttpStatus.OK);
    expect(body).toMatchObject(expectedUser);
  });

  it('Update [PATCH /:id]', async () => {
    const response = await request(server)
      .patch('/users/1')
      .send(updateUserDto);
    const { status } = response;
    const body = response.body as User;

    expect(status).toBe(HttpStatus.OK);
    expect(body.name).toBe(updateUserDto.name);

    const findOneResponse = await request(server).get('/users/1');
    const findOneBody = findOneResponse.body as User;
    expect(findOneBody.name).toBe(updateUserDto.name);
  });

  it('Remove [DELETE /:id]', async () => {
    const response = await request(server).delete('/users/1');
    const { status } = response;

    expect(status).toBe(HttpStatus.OK);

    const findOneResponse = await request(server).get('/users/1');
    expect(findOneResponse.status).toBe(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
