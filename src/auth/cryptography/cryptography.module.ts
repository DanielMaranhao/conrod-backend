import { Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service.js';
import { HashingService } from './hashing/hashing.service.js';

@Module({
  providers: [{ provide: HashingService, useClass: BcryptService }],
  exports: [HashingService],
})
export class CryptographyModule {}
