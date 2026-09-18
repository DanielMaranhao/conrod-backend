import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

export default registerAs('testDatabase', () => {
  const user = env.DATABASE_USER!;
  const password = env.DATABASE_PASSWORD!;
  const host = env.DATABASE_HOST!;
  const port = env.DATABASE_PORT!;
  const name = env.DATABASE_NAME!;

  const url = `postgresql://${user}:${password}@${host}:${port}/${name}`;

  const config = {
    type: 'postgres',
    url,
    autoLoadEntities: true,
    synchronize: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
