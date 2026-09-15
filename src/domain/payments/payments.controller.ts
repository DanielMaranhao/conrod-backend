import { User } from '#/auth/decorators/user.decorator.js';
import type { RequestUser } from '#/auth/interfaces/request-user.interface.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { Controller, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':id')
  payOrder(@Param() { id }: IdDto, @User() user: RequestUser) {
    return this.paymentsService.payOrder(id, user);
  }
}
