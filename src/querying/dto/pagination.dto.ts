import { IsCardinal } from '#/common/decorators/validators/is-cardinal.decorator.js';
import {
  MAX_PAGE_NUMBER,
  MAX_PAGE_SIZE,
} from '#/querying/util/querying.constants.js';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Max(MAX_PAGE_SIZE)
  @IsCardinal()
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Max(MAX_PAGE_NUMBER)
  @IsCardinal()
  readonly page: number = 1;
}
