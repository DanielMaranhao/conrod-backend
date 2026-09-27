import { DatabaseModule } from '#/database/database.module.js';
import { SeedingModule } from '#/database/seeding/seeding.module.js';
import { EnvModule } from '#/env/env.module.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, SeedingModule, EnvModule],
})
export class CliModule {}
