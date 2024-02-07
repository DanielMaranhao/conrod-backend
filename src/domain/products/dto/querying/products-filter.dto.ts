import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { IsCurrency } from 'common/decorators/validators/is-currency.decorator';
import { NameFilterDto } from 'querying/dto/name-filter.dto';

export class ProductsFilterDto extends NameFilterDto {
  @IsOptional()
  @IsCurrency()
  readonly price?: number;

  @IsOptional()
  @IsCardinal()
  readonly categoryId?: number;
}
