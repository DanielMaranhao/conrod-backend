import { ArrayUniqueIdentifier } from 'class-validator';
import { IdDto } from 'common/dto/id.dto';
import { OrderItemDto } from 'orders/dto/order-item.dto';

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
