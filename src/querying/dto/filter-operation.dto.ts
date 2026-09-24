import { ValidateFilterOperandsLength } from '#/querying/decorators/validate-filter-operands-length.decorator.js';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';

const Operator = ['lt', 'lte', 'gt', 'gte', 'eq', 'btw'] as const;
type Operator = (typeof Operator)[number];

export class FilterOperationDto {
  @IsIn(Operator)
  readonly operator: Operator;

  @IsNumber({}, { each: true })
  readonly operands: number[];

  @ApiHideProperty()
  @ValidateFilterOperandsLength()
  private readonly manyFieldsValidation: any;
}
