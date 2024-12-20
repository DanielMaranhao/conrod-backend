import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('testDatabase', () => {
  const config = {
    type: 'postgres',
    url: process.env.TEST_DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
