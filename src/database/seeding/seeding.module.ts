import { Module } from '@nestjs/common';
import { SeedFixturesCommand } from './commands/seed-fixtures.command.js';
import { SeedingController } from './seeding.controller.js';
import { SeedingService } from './seeding.service.js';

@Module({
  controllers: [SeedingController],
  providers: [SeedingService, SeedFixturesCommand],
})
export class SeedingModule {}
