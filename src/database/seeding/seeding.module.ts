import { CryptographyModule } from '#/auth/cryptography/cryptography.module.js';
import { Category } from '#d/categories/entities/category.entity.js';
import { OrderItem } from '#d/orders/entities/order-item.entity.js';
import { Order } from '#d/orders/entities/order.entity.js';
import { Payment } from '#d/payments/entities/payment.entity.js';
import { Product } from '#d/products/entities/product.entity.js';
import { User } from '#d/users/entities/user.entity.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedFixturesCommand } from './commands/seed-fixtures.command.js';
import { SeedingService } from './seeding.service.js';

const ENTITIES = [User, Category, Product, Order, OrderItem, Payment];

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES), CryptographyModule],
  providers: [SeedingService, SeedFixturesCommand],
})
export class SeedingModule {}
