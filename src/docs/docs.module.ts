import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DocsForbiddenMapper } from './docs-forbidden-mapper/docs-forbidden.mapper';
import { DocsUnauthorizedMapper } from './docs-unauthorized-mapper/docs-unauthorized.mapper';

@Module({
  imports: [DiscoveryModule],
  providers: [DocsUnauthorizedMapper, DocsForbiddenMapper],
})
export class DocsModule {}
