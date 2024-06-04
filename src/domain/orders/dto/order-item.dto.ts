import { IsCardinal } from 'common/decorators/is-cardinal.decorator';
import { IsEntity } from 'common/decorators/is-entity.decorator';
import { IdDto } from 'common/dto/id.dto';

export class OrderItemDto {
  @IsEntity()
  readonly product: IdDto;

  @IsCardinal()
  readonly quantity: number;
}
