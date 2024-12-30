import { Transform, plainToInstance } from 'class-transformer';
import { FilterOperationDto } from 'querying/dto/filter-operation.dto';

const toFilterOperationDto = (value: string) => {
  const colonIndex = value.indexOf(':');

  if (colonIndex === -1) {
    const plainDto = { operator: value, operands: [] };
    return plainToInstance(FilterOperationDto, plainDto);
  }

  const operator = value.substring(0, colonIndex);
  const concOperands = value.substring(colonIndex + 1);

  const operandsStr = concOperands.split(',');
  const operands = operandsStr.map((operand) => +operand);

  const plainDto = { operator, operands };
  return plainToInstance(FilterOperationDto, plainDto);
};

export const ToFilterOperationDto = () =>
  Transform(({ value }) => toFilterOperationDto(value));
