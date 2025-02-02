import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([User])],
  providers: [CronService],
})
export class CronModule {}
