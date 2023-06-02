import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
