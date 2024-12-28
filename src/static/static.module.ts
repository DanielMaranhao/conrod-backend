import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BASE_PATH } from 'files/util/file.constants';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(BASE_PATH),
      serveRoot: '/files',
    }),
  ],
})
export class StaticModule {}
