import { FILE_SCHEMA } from '#/files/util/file.constants.js';
import { ApiProperty } from '@nestjs/swagger';

export const ApiFilesProperty = () =>
  ApiProperty({ type: 'array', items: FILE_SCHEMA });
