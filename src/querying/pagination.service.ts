import { Injectable } from '@nestjs/common';
import { PaginationMeta } from './swagger/schemas/pagination-meta.schema.js';

@Injectable()
export class PaginationService {
  calculateOffset(limit: number, page: number) {
    return (page - 1) * limit;
  }

  createMeta(limit: number, page: number, count: number) {
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) return;

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const meta: PaginationMeta = {
      itemsPerPage: limit,
      totalItems: count,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
    return meta;
  }
}
