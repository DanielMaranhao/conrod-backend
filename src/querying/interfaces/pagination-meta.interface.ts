export interface PaginationMeta {
  readonly itemsPerPage: number;
  readonly totalItems: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}
