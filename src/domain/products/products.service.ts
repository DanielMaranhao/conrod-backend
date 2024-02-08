import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'files/storage/storage.service';
import { BASE_PATH, FilePath, MaxFileCount } from 'files/util/file.constants';
import { pathExists } from 'fs-extra';
import { join } from 'path';
import { PaginationService } from 'querying/pagination.service';
import { DefaultPageSize } from 'querying/util/querying.constants';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/querying/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly storageService: StorageService,
    private readonly paginationService: PaginationService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(productsQueryDto: ProductsQueryDto) {
    const { page, name, price, categoryId, sort, order } = productsQueryDto;
    const limit = productsQueryDto.limit ?? DefaultPageSize.PRODUCT;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.productsRepository.findAndCount({
      where: {
        name: name ? ILike(`%${name}%`) : undefined,
        price,
        categories: { id: categoryId },
      },
      order: { [sort]: order },
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);

    return { data, meta };
  }

  async findOne(id: number) {
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

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);

    await this.deleteBaseDir(id);

    return product;
  }

  async uploadImages(id: number, files: Express.Multer.File[]) {
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
