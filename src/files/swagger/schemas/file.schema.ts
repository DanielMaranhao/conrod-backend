import type { File } from '#/files/types/file.types.js';
import { ApiFileProperty } from '../decorators/api-file-property.decorator.js';

export class FileSchema {
  @ApiFileProperty()
  file: File;
}
