import { FILE_SCHEMA } from '#/files/util/file.constants.js';
import { ApiProperty } from '@nestjs/swagger';

export const ApiFileProperty = () => ApiProperty(FILE_SCHEMA);
