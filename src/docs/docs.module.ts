import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DocsUnauthorizedMapper } from './docs-unauthorized-mapper/docs-unauthorized.mapper';

@Module({
  imports: [DiscoveryModule],
  providers: [DocsUnauthorizedMapper],
})
export class DocsModule {}
