import { IsCurrency } from '#/common/decorators/validators/is-currency.decorator.js';
import { IsEntity } from '#/common/decorators/validators/is-entity.decorator.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { IdentifierFn } from '#/common/util/id.util.js';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description?: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @ArrayUnique(IdentifierFn.ID_DTO)
  @IsEntity()
  readonly categories: IdDto[];
}
