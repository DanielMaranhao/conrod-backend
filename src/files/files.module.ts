import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FilesExceptionFilter } from './exception-filters/files-exception/files-exception.filter';
import { FseService } from './storage/fse.service';
import { StorageService } from './storage/storage.service';

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: FseService,
    },
    {
      provide: APP_FILTER,
      useClass: FilesExceptionFilter,
    },
  ],
  exports: [StorageService],
})
export class FilesModule {}
