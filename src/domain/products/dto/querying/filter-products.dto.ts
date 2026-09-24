import { ToArray } from '#/common/decorators/transformers/to-array.decorator.js';
import { IsCardinal } from '#/common/decorators/validators/is-cardinal.decorator.js';
import { FilterOperationDto } from '#/querying/dto/filter-operation.dto.js';
import { NameFilterDto } from '#/querying/dto/name-filter.dto.js';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class FilterProductsDto extends NameFilterDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterOperationDto)
  readonly price?: FilterOperationDto;

  @IsOptional()
  @IsCardinal({ each: true })
  @ToArray()
  @Type(() => Number)
  readonly categoryIds?: number[];
}
