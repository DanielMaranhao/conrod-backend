import { IsCardinal } from '#/common/decorators/validators/is-cardinal.decorator.js';
import { MAX_INT_32 } from '#/common/util/common.constants.js';
import { Max } from 'class-validator';

export class IdDto {
  @Max(MAX_INT_32)
  @IsCardinal()
  readonly id: number;
}
