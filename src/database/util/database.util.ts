import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata.js';

export const isPropertyUpdated = <TEntity>(
  updatedColumns: ColumnMetadata[],
  propertyName: keyof TEntity,
) => updatedColumns.some((column) => column.propertyName === propertyName);
