import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { AlsConfig } from './config/als.config.js';

@Module({
  imports: [ClsModule.forRoot(AlsConfig)],
})
export class AlsModule {}
