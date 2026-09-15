import { PaginationDto } from '#/querying/dto/pagination.dto.js';
import { IntersectionType } from '@nestjs/swagger';
import { FilterProductsDto } from './filter-products.dto.js';
import { SortProductsDto } from './sort-products.dto.js';

export class QueryProductsDto extends IntersectionType(
  FilterProductsDto,
  SortProductsDto,
  PaginationDto,
) {}
