import { IsOptional } from 'class-validator';
import { IsBoolean } from 'common/decorators/validators/is-boolean.decorator';

export class RemoveDto {
  @IsOptional()
  @IsBoolean()
  readonly soft: boolean;
}
