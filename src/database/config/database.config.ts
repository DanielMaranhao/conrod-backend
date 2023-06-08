import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATASOURCE_URL,
}));
