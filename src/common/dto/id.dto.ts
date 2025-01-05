import { Max } from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { MAX_INT_32 } from 'common/util/common.constants';

export class IdDto {
  @Max(MAX_INT_32)
  @IsCardinal()
  readonly id: number;
}
