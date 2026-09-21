import { AuthModule } from '#/auth/auth.module.js';
import { MailModule } from '#/mail/mail.module.js';
import { QueryingModule } from '#/querying/querying.module.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { UsersSubscriber } from './subscribers/users.subscriber.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    QueryingModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
