import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { ProductsModule } from './domain/products/products.module';

@Module({
  imports: [DatabaseModule, UsersModule, CommonModule, OrdersModule, PaymentsModule, CategoriesModule, ProductsModule],
})
export class AppModule {}
