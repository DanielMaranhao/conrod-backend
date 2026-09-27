import { CryptographyModule } from '#/auth/cryptography/cryptography.module.js';
import { Module } from '@nestjs/common';
import { SeedFixturesCommand } from './commands/seed-fixtures.command.js';
import { SeedingController } from './seeding.controller.js';
import { SeedingService } from './seeding.service.js';

@Module({
  imports: [CryptographyModule],
  controllers: [SeedingController],
  providers: [SeedingService, SeedFixturesCommand],
})
export class SeedingModule {}
