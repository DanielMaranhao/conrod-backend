import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ResponseStatusMapper } from './response-status-mapper/response-status-mapper.js';

@Module({
  imports: [DiscoveryModule],
  providers: [ResponseStatusMapper],
})
export class DocsModule {}
