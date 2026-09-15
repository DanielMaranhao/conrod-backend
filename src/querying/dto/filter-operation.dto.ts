import { ValidateFilterOperandsLength } from '#/querying/decorators/validate-filter-operands-length.decorator.js';
import { IsIn, IsNumber } from 'class-validator';

const Operator = ['lt', 'lte', 'gt', 'gte', 'eq', 'btw'] as const;
type Operator = (typeof Operator)[number];

export class FilterOperationDto {
  @IsIn(Operator)
  readonly operator: Operator;

  @IsNumber({}, { each: true })
  readonly operands: number[];

  @ValidateFilterOperandsLength()
  private readonly manyFieldsValidation: any;
}
