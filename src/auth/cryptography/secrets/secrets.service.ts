import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

export const Encoding = ['hex', 'base64'] as const satisfies BufferEncoding[];
export type Encoding = (typeof Encoding)[number];

@Injectable()
export class SecretsService {
  generateSecret(bytes: number, encoding: Encoding) {
    return randomBytes(bytes).toString(encoding);
  }
}
