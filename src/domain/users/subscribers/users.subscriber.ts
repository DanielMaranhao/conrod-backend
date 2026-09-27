import { HashingService } from '#/auth/hashing/hashing.service.js';
import { isPropertyUpdated } from '#/database/util/database.util.js';
import { MailService } from '#/mail/mail.service.js';
import { User } from '#d/users/entities/user.entity.js';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
    private readonly mailService: MailService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { entity: user } = event;
    const { password } = user;

    user.password = await this.hashingService.hash(password);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    const { entity, updatedColumns: cols } = event;

    const user = entity as User;
    const { password } = user;

    const isPasswordUpdated = isPropertyUpdated<User>(cols, 'password');

    if (isPasswordUpdated) {
      user.password = await this.hashingService.hash(password);
    }
  }

  async afterInsert(event: InsertEvent<User>) {
    const { entity: user } = event;
    const { name, email } = user;

    const mailPayload = { name, email } as const;
    await this.mailService.sendAccountConfirmation(mailPayload);
  }
}
