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

/** IdDto Identifier for ArrayUnique validator */
export const idDtoIdentifier = (dto: IdDto) => dto.id;

/** OrderItemDto Identifier for ArrayUnique validator */
export const orderItemDtoIdentifier = (dto: OrderItemDto) => dto.product?.id;
