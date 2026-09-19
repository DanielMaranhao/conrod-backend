import { IsEntity } from '#/common/decorators/validators/is-entity.decorator.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { IdentifierFn } from '#/common/util/id.util.js';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto.js';

export class CreateOrderDto {
  @IsObject()
  @IsEntity()
  readonly customer: IdDto;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFn.ORDER_ITEM_DTO)
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
}
