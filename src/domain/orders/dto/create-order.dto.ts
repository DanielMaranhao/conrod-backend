import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';
import { IdDto } from 'common/dto/id.dto';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsEntity()
  readonly customer: IdDto;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
}
