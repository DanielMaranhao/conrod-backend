import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config.js';
import { DatabaseExceptionFilter } from './exception-filters/database-exception/database-exception.filter.js';
import { NotFoundExceptionFilter } from './exception-filters/not-found-exception/not-found-exception.filter.js';
import { SeedingModule } from './seeding/seeding.module.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    SeedingModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
  ],
})
export class DatabaseModule {}
