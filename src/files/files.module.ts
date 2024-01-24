import { Module } from '@nestjs/common';
import { FseService } from './storage/fse.service';
import { StorageService } from './storage/storage.service';

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: FseService,
    },
  ],
})
export class FilesModule {}
