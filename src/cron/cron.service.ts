import { User } from '#d/users/entities/user.entity.js';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { sub } from 'date-fns';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldSoftDeletedUsers() {
    const now = new Date();
    const oneMonthAgo = sub(now, { months: 1 });

    const users = await this.usersRepository.find({
      where: { registryDates: { deletedAt: LessThan(oneMonthAgo) } },
      withDeleted: true,
    });

    await this.usersRepository.remove(users);
  }
}
