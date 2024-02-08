import { Module } from '@nestjs/common';
import { FilteringService } from './filtering.service';
import { PaginationService } from './pagination.service';

@Module({
  providers: [PaginationService, FilteringService],
  exports: [PaginationService, FilteringService],
})
export class QueryingModule {}
