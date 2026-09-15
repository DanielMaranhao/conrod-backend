import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { CommonModule } from './common/common.module.js';
import { CronModule } from './cron/cron.module.js';
import { DatabaseModule } from './database/database.module.js';
import { DocsModule } from './docs/docs.module.js';
import { CategoriesModule } from './domain/categories/categories.module.js';
import { OrdersModule } from './domain/orders/orders.module.js';
import { PaymentsModule } from './domain/payments/payments.module.js';
import { ProductsModule } from './domain/products/products.module.js';
import { UsersModule } from './domain/users/users.module.js';
import { EnvModule } from './env/env.module.js';
import { FilesModule } from './files/files.module.js';
import { HealthModule } from './health/health.module.js';
import { MailModule } from './mail/mail.module.js';
import { QueryingModule } from './querying/querying.module.js';
import { StaticModule } from './static/static.module.js';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    CommonModule,
    AuthModule,
    FilesModule,
    QueryingModule,
    DocsModule,
    StaticModule,
    MailModule,
    HealthModule,
    CronModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
