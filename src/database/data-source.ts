import 'dotenv/config';
import { env } from 'process';
import { DataSource } from 'typeorm';

const user = env.DATABASE_USER!;
const password = env.DATABASE_PASSWORD!;
const host = env.DATABASE_HOST!;
const port = env.DATABASE_PORT!;
const name = env.DATABASE_NAME!;

const url = `postgresql://${user}:${password}@${host}:${port}/${name}`;

export default new DataSource({
  type: 'postgres',
  url,
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
