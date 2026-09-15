import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FilesExceptionFilter } from './exception-filters/files-exception/files-exception.filter.js';
import { FseService } from './storage/fse.service.js';
import { StorageService } from './storage/storage.service.js';

@Module({
  providers: [
    { provide: StorageService, useClass: FseService },
    { provide: APP_FILTER, useClass: FilesExceptionFilter },
  ],
  exports: [StorageService],
})
export class FilesModule {}
