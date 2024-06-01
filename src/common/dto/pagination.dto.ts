import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/is-cardinal.decorator';

export class PaginationDto {
  @IsOptional()
  @IsCardinal()
  readonly limit: number;

  @IsOptional()
  @IsCardinal()
  readonly offset: number;
}
