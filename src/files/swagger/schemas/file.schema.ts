import { File } from 'files/util/file.constants';
import { ApiFileProperty } from '../decorators/api-file-property.decorator';

export class FileSchema {
  @ApiFileProperty()
  file: File;
}
