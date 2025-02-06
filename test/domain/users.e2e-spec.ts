import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'auth/roles/enums/role.enum';
import { VALIDATION_PIPE_OPTIONS } from 'common/util/common.constants';
import { NotFoundExceptionFilter } from 'database/exception-filters/not-found-exception/not-found-exception.filter';
import * as request from 'supertest';
import { App } from 'supertest/types';
import testDatabaseConfig from 'testing/config/test-database.config';
import { TEST_ENV_VALIDATION_SCHEMA } from 'testing/util/testing.constants';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UpdateUserDto } from 'users/dto/update-user.dto';
import { User } from 'users/entities/user.entity';
import { UsersModule } from 'users/users.module';

const createUserDto: CreateUserDto = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  phone: '85988888888',
  password: 'AAaa11!!',
};

const updateUserDto: UpdateUserDto = {
  name: faker.person.firstName(),
};

const expectedUser = {
  id: 1,
  ...createUserDto,
  role: Role.USER,
} as User;

describe('Users [/users]', () => {
  let app: INestApplication<App>;
  let server: App;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          validationSchema: TEST_ENV_VALIDATION_SCHEMA,
          envFilePath: '.env.test.local',
        }),
        TypeOrmModule.forRootAsync(testDatabaseConfig.asProvider()),
      ],
      providers: [
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
        },
        {
          provide: APP_FILTER,
          useClass: NotFoundExceptionFilter,
        },
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
