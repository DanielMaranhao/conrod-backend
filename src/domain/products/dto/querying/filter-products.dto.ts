import { IsCardinal } from '#/common/decorators/validators/is-cardinal.decorator.js';
import { ToFilterOperationDto } from '#/querying/decorators/to-filter-operation-dto.decorator.js';
import { FilterOperationDto } from '#/querying/dto/filter-operation.dto.js';
import { NameFilterDto } from '#/querying/dto/name-filter.dto.js';
import { IsOptional, ValidateNested } from 'class-validator';

export class FilterProductsDto extends NameFilterDto {
  @IsOptional()
  @ValidateNested()
  @ToFilterOperationDto()
  readonly price?: FilterOperationDto;

  @IsOptional()
  @IsCardinal()
  readonly categoryId?: number;
}
