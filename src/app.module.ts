import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { ProductsModule } from './domain/products/products.module';
import { UsersModule } from './domain/users/users.module';
import { EnvModule } from './env/env.module';
import { FilesModule } from './files/files.module';
import { QueryingModule } from './querying/querying.module';
import { DocsModule } from './docs/docs.module';
import { StaticModule } from './static/static.module';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    CommonModule,
    AuthModule,
    FilesModule,
    QueryingModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductsModule,
    DocsModule,
    StaticModule,
    MailModule,
    HealthModule,
    CronModule,
  ],
})
export class AppModule {}
