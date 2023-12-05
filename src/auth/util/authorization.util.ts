import { ForbiddenException } from '@nestjs/common';

export const compareUserId = (userId: number, requiredId: number) => {
  if (userId !== requiredId) {
    throw new ForbiddenException('Forbidden resource');
  }
};
