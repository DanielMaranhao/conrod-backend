import { Module } from '@nestjs/common';
import { SeedingController } from './seeding.controller.js';
import { SeedingService } from './seeding.service.js';

@Module({ controllers: [SeedingController], providers: [SeedingService] })
export class SeedingModule {}
