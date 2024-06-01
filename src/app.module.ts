import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
