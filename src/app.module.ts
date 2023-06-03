import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, CommonModule],
})
export class AppModule {}
