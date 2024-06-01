import { IsCardinal } from 'common/decorators/is-cardinal.decorator';

export class IdDto {
  @IsCardinal()
  readonly id: number;
}
