import { File } from '#/files/types/file.types.js';
import { ApiFilesProperty } from '../decorators/api-files-property.decorator.js';

export class FilesSchema {
  @ApiFilesProperty()
  files: File[];
}
