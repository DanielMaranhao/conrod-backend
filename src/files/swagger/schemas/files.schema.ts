import { File } from 'files/util/file.constants';
import { ApiFilesProperty } from '../decorators/api-files-property.decorator';

export class FilesSchema {
  @ApiFilesProperty()
  files: File[];
}
