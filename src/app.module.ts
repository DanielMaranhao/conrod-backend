import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { ProductsModule } from './domain/products/products.module';
import { UsersModule } from './domain/users/users.module';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    CommonModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
