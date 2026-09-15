import { IsCardinal } from '#/common/decorators/validators/is-cardinal.decorator.js';
import { IsEntity } from '#/common/decorators/validators/is-entity.decorator.js';
import { IdDto } from '#/common/dto/id.dto.js';

export class OrderItemDto {
  @IsEntity()
  readonly product: IdDto;

  @IsCardinal()
  readonly quantity: number;
}
