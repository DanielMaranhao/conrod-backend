import { OrderDto } from '#/querying/dto/order.dto.js';
import { Product } from '#d/products/entities/product.entity.js';
import { IsIn, IsOptional } from 'class-validator';

const Sort = ['name', 'price'] as const satisfies (keyof Product)[];
type Sort = (typeof Sort)[number];

export class SortProductsDto extends OrderDto {
  @IsOptional()
  @IsIn(Sort)
  readonly sort?: Sort = 'name';
}
