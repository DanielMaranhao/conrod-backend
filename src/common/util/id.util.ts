import { IdDto } from 'common/dto/id.dto';

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
