import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  username: 'postgres',
  password: 'pass123',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
