import { ApiFilesProperty } from '../decorators/api-files-property.decorator';

export class FilesSchema {
  @ApiFilesProperty()
  files: Express.Multer.File[];
}
