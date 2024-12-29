import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { FilterProductsDto } from './filter-products.dto';
import { SortProductsDto } from './sort-products.dto';

export class QueryProductsDto extends IntersectionType(
  FilterProductsDto,
  SortProductsDto,
  PaginationDto,
) {}
