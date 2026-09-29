import { IsBoolean } from '#/common/decorators/validators/is-boolean.decorator.js';
import { IsOptional } from 'class-validator';

export class RemoveDto {
  @IsOptional()
  @IsBoolean()
  readonly soft?: boolean;
}
