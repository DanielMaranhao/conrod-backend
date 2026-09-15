import { IsBoolean } from '#/common/decorators/validators/is-boolean.decorator.js';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RemoveDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly soft: boolean = true;
}
