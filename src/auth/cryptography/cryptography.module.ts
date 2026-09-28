import { Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service.js';
import { HashingService } from './hashing/hashing.service.js';
import { GenerateSecretCommand } from './secrets/commands/generate-secret.command.js';
import { SecretsService } from './secrets/secrets.service.js';

@Module({
  providers: [
    { provide: HashingService, useClass: BcryptService },
    SecretsService,
    GenerateSecretCommand,
  ],
  exports: [HashingService],
})
export class CryptographyModule {}
