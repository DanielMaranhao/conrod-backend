import { FilterOperationDto } from '#/querying/dto/filter-operation.dto.js';
import { ValidateBy, ValidationArguments } from 'class-validator';

const key = 'validateFilterOperandsLength';
const message = 'Operands length is not according to filter operator';

const validate = (args: ValidationArguments) => {
  const filterOperationDto = args.object as FilterOperationDto;
  const { operator, operands } = filterOperationDto;

  switch (operator) {
    case 'lt':
    case 'lte':
    case 'gt':
    case 'gte':
    case 'eq':
      return operands.length === 1;

    case 'btw':
      return operands.length === 2;

    default:
      const exhaustiveCheck: never = operator;
      return exhaustiveCheck;
  }
};

export const ValidateFilterOperandsLength = () =>
  ValidateBy({
    name: key,
    validator: {
      validate: (_, args) => validate(args!),
      defaultMessage: () => message,
    },
  });
