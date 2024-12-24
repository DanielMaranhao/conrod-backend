import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  Length,
} from 'class-validator';
import { IsCurrency } from 'common/decorators/validators/is-currency.decorator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';
import { IdDto } from 'common/dto/id.dto';
import { idDtoIdentifier } from 'common/util/id.util';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description?: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @ArrayUnique(idDtoIdentifier)
  @IsEntity()
  readonly categories: IdDto[];
}
