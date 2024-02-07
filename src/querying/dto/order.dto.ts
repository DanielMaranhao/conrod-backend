import { IsIn, IsOptional } from 'class-validator';

const Order = ['ASC', 'DESC'] as const;
type Order = (typeof Order)[number];

export class OrderDto {
  @IsOptional()
  @IsIn(Order)
  readonly order?: Order = 'ASC';
}
