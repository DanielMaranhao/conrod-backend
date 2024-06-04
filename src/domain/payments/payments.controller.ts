import { Controller, Param, Post } from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':id')
  payOrder(@Param() { id }: IdDto) {
    return this.paymentsService.payOrder(id);
  }
}
