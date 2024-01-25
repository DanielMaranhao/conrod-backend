import { ApiProperty } from '@nestjs/swagger';

export const ApiFilesProperty = () =>
  ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } });
