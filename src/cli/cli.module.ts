import { DatabaseModule } from '#/database/database.module.js';
import { EnvModule } from '#/env/env.module.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, EnvModule],
})
export class CliModule {}
