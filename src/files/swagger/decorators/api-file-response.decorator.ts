import { FILE_SCHEMA } from '#/files/util/file.constants.js';
import { ApiOkResponse, ApiResponseOptions } from '@nestjs/swagger';

const ResponseOptions = {
  description: 'File download',
  content: { 'application/octet-stream': { schema: FILE_SCHEMA } },
} as const satisfies ApiResponseOptions;

export const ApiFileResponse = () => ApiOkResponse(ResponseOptions);
