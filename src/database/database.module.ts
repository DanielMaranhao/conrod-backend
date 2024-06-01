import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new PrismaClientExceptionFilter(),
    },
  ],
})
export class DatabaseModule {}
