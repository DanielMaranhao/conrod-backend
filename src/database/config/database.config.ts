import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const name = process.env.DATABASE_NAME;

  const url = `postgresql://${user}:${password}@${host}:${port}/${name}`;

  const config = {
    type: 'postgres',
    url,
    autoLoadEntities: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
