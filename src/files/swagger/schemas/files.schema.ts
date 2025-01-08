import { File } from 'files/types/file.types';
import { ApiFilesProperty } from '../decorators/api-files-property.decorator';

export class FilesSchema {
  @ApiFilesProperty()
  files: File[];
}
