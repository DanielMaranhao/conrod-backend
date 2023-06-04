import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'pass123',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
