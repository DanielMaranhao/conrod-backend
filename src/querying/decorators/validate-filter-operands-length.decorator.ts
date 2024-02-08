import { ValidateBy, ValidationArguments } from 'class-validator';
import { FilterOperationDto } from 'querying/dto/filter-operation.dto';

const VALIDATE_FILTER_OPERANDS_LENGTH_KEY = 'validateFilterOperandsLength';

const validateFilterOperandsLength = (args: ValidationArguments) => {
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

export const ValidateFilterOperandsLength = (): PropertyDecorator =>
  ValidateBy({
    name: VALIDATE_FILTER_OPERANDS_LENGTH_KEY,
    validator: {
      validate: (value, args): boolean => validateFilterOperandsLength(args),
      defaultMessage: () =>
        'Operands length is not according to filter operator',
    },
  });
