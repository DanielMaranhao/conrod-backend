import { ArrayNotEmpty, IsCurrency, IsOptional, Length } from 'class-validator';
import { IsEntity } from 'common/decorators/is-entity.decorator';
import { IdDto } from 'common/dto/id.dto';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description?: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @IsEntity()
  readonly categories: IdDto[];
}
