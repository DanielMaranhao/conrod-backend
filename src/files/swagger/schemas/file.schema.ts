import { File } from 'files/types/file.types';
import { ApiFileProperty } from '../decorators/api-file-property.decorator';

export class FileSchema {
  @ApiFileProperty()
  file: File;
}
