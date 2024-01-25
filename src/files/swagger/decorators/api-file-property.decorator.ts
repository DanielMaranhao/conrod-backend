import { ApiProperty } from '@nestjs/swagger';

export const ApiFileProperty = () =>
  ApiProperty({ type: 'string', format: 'binary' });
