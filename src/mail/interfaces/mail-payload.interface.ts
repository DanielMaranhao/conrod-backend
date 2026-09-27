import { User } from '#d/users/entities/user.entity.js';

export interface MailPayload {
  sendAccountConfirmation: {
    name: User['name'];
    email: User['email'];
  };
}
