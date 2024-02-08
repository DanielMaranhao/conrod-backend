import { IsOptional, ValidateNested } from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { ToFilterOperationDto } from 'querying/decorators/to-filter-operation-dto.decorator';
import { FilterOperationDto } from 'querying/dto/filter-operation.dto';
import { NameFilterDto } from 'querying/dto/name-filter.dto';

export class ProductsFilterDto extends NameFilterDto {
  @IsOptional()
  @ValidateNested()
  @ToFilterOperationDto()
  readonly price?: FilterOperationDto;

  @IsOptional()
  @IsCardinal()
  readonly categoryId?: number;
}
