import { IsString } from 'class-validator';

export class FilenameDto {
  @IsString()
  readonly filename: string;
}
