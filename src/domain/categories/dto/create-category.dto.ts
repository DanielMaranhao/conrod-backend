import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(2, 50)
  readonly name: string;
}
