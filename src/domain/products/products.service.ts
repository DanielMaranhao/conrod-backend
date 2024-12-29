import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'files/storage/storage.service';
import {
  BASE_PATH,
  File,
  FilePath,
  MaxFileCount,
} from 'files/util/file.constants';
import { pathExists } from 'fs-extra';
import { join } from 'path';
import { FilteringService } from 'querying/filtering.service';
import { PaginationService } from 'querying/pagination.service';
import { DefaultPageSize } from 'querying/util/querying.constants';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/querying/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly storageService: StorageService,
    private readonly paginationService: PaginationService,
    private readonly filteringService: FilteringService,
    private readonly dataSource: DataSource,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(queryProductsDto: QueryProductsDto) {
    const { page, name, price, categoryId, sort, order } = queryProductsDto;
    const limit = queryProductsDto.limit ?? DefaultPageSize.PRODUCTS;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.productsRepository.findAndCount({
      where: {
        name: this.filteringService.contains(name),
        price: this.filteringService.compare(price),
        categories: { id: categoryId },
      },
      order: { [sort]: order },
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);

    return { data, meta };
  }

  findOne(id: number) {
    return this.productsRepository.findOneOrFail({
      where: { id },
      relations: {
        categories: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productsRepository.save(product);
  }

  remove(id: number) {
    return this.dataSource.transaction(async (manager) => {
      const productsRepository = manager.getRepository(Product);

      const product = await productsRepository.findOneByOrFail({ id });
      await productsRepository.remove(product);

      await this.deleteBaseDir(id);

      return product;
    });
  }

  async uploadImages(id: number, files: File[]) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);

    if (await pathExists(join(BASE_PATH, path))) {
      const incomingFilecount = files.length;
      const dirFilecount = await this.storageService.getDirFilecount(path);
      const totalFilecount = incomingFilecount + dirFilecount;

      this.storageService.validateFilecount(
        totalFilecount,
        MaxFileCount.PRODUCT_IMAGES,
      );
    }

    await this.storageService.createDir(path);

    await Promise.all(
      files.map((file) => this.storageService.saveFile(path, file)),
    );
  }

  async downloadImage(id: number, filename: string) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);

    await this.storageService.validatePath(path);

    return this.storageService.getFile(path);
  }

  async deleteImage(id: number, filename: string) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);

    await this.storageService.validatePath(path);

    await this.storageService.delete(path);
  }

  private async deleteBaseDir(id: number) {
    const { BASE } = FilePath.Products;

    const path = join(BASE, id.toString());
    await this.storageService.delete(path);
  }
}
