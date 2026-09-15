import { StorageService } from '#/files/storage/storage.service.js';
import { BASE_PATH, FilePath } from '#/files/util/file.constants.js';
import { Product } from '#d/products/entities/product.entity.js';
import fse from 'fs-extra';
import { join } from 'path';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  async afterLoad(entity: Product) {
    const product = entity as Product & ExtraProperties;
    product.imagesFilenames = await this.getImagesFilenames(product.id);
  }

  private async getImagesFilenames(id: number) {
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);

    if (!(await fse.pathExists(join(BASE_PATH, path)))) return;

    return this.storageService.getDirFilenames(path);
  }
}

type ExtraProperties = { imagesFilenames: string[] | undefined };
