import { ApiFileProperty } from '../decorators/api-file-property.decorator';

export class FileSchema {
  @ApiFileProperty()
  file: Express.Multer.File;
}
