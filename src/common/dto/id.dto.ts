import { IsInt, IsPositive } from 'class-validator';

export class IdDto {
  @IsInt()
  @IsPositive()
  id: number;
}
