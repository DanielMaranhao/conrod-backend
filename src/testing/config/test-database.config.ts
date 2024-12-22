import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('testDatabase', () => {
  const user = process.env.TEST_DATABASE_USER;
  const password = process.env.TEST_DATABASE_PASSWORD;
  const host = process.env.TEST_DATABASE_HOST;
  const port = process.env.TEST_DATABASE_PORT;
  const name = process.env.TEST_DATABASE_NAME;

  const url = `postgresql://${user}:${password}@${host}:${port}/${name}`;

  const config = {
    type: 'postgres',
    url,
    autoLoadEntities: true,
    synchronize: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
