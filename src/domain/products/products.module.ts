import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'files/files.module';
import { QueryingModule } from 'querying/querying.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSubscriber } from './subscribers/products.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FilesModule, QueryingModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSubscriber],
})
export class ProductsModule {}
