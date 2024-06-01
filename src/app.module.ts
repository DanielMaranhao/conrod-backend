import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './domain/orders/orders.module';

@Module({
  imports: [DatabaseModule, UsersModule, CommonModule, OrdersModule],
})
export class AppModule {}
