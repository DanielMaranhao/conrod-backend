import { IsIn, IsOptional } from 'class-validator';
import { Product } from 'products/entities/product.entity';
import { OrderDto } from 'querying/dto/order.dto';

const Sort: (keyof Product)[] = ['name', 'price'] as const;
type Sort = (typeof Sort)[number];

export class SortProductsDto extends OrderDto {
  @IsOptional()
  @IsIn(Sort)
  readonly sort?: Sort = 'name';
}
