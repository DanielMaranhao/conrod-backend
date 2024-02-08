import { Transform, plainToInstance } from 'class-transformer';
import { FilterOperationDto } from 'querying/dto/filter-operation.dto';

const toFilterOperationDto = (value: string) => {
  const [operator, concOperands] = value.split(':');
  const operandsStr = concOperands ? concOperands.split(',') : [];
  const operands = operandsStr.map((operand) => +operand);

  const plainDto = { operator, operands };
  return plainToInstance(FilterOperationDto, plainDto);
};

export const ToFilterOperationDto = () =>
  Transform(({ value }) => toFilterOperationDto(value));
