import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CronModule } from './cron/cron.module';
import { DatabaseModule } from './database/database.module';
import { DocsModule } from './docs/docs.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { ProductsModule } from './domain/products/products.module';
import { UsersModule } from './domain/users/users.module';
import { EnvModule } from './env/env.module';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';
import { QueryingModule } from './querying/querying.module';
import { StaticModule } from './static/static.module';

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
