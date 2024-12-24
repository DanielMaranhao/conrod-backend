import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';

export class IdDto {
  @IsCardinal()
  readonly id: number;
}
