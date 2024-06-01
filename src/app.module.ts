import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [DatabaseModule, UsersModule, CommonModule],
})
export class AppModule {}
