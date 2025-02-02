import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { sub } from 'date-fns';
import { LessThan, Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldSoftDeletedUsers() {
    const oneMonthAgo = sub(new Date(), { months: 1 });

    const users = await this.usersRepository.find({
      where: {
        registryDates: { deletedAt: LessThan(oneMonthAgo) },
      },
      withDeleted: true,
    });

    await this.usersRepository.remove(users);
  }
}
