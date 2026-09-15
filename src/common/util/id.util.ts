import { IdDto } from '#/common/dto/id.dto.js';
import { OrderItemDto } from '#d/orders/dto/order-item.dto.js';
import { ArrayUniqueIdentifier } from 'class-validator';

export function wrapId(id: number): IdDto;
export function wrapId(ids: number[]): IdDto[];
export function wrapId(idOrIds: number | number[]) {
  if (Array.isArray(idOrIds)) {
    const ids = idOrIds;
    return ids.map((id) => ({ id }));
  }

  const id = idOrIds;
  return { id };
}

export const IdentifierFn = {
  ID_DTO: (dto: IdDto) => dto.id,
  ORDER_ITEM_DTO: (dto: OrderItemDto) => dto.product?.id,
} as const satisfies Record<string, ArrayUniqueIdentifier>;
