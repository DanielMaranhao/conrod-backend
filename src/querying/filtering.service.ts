import { Injectable } from '@nestjs/common';
import {
  Between,
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { FilterOperationDto } from './dto/filter-operation.dto';

@Injectable()
export class FilteringService {
  contains(text: string) {
    if (!text) return;

    return ILike(`%${text}%`);
  }

  compare(filterOperationDto: FilterOperationDto) {
    if (!filterOperationDto) return;

    const { operator, operands } = filterOperationDto;
    const [operand, secondOperand] = operands;

    switch (operator) {
      case 'lt':
        return LessThan(operand);
      case 'lte':
        return LessThanOrEqual(operand);
      case 'gt':
        return MoreThan(operand);
      case 'gte':
        return MoreThanOrEqual(operand);
      case 'eq':
        return Equal(operand);
      case 'btw':
        return Between(operand, secondOperand);

      default:
        const exhaustiveCheck: never = operator;
        return exhaustiveCheck;
    }
  }
}
