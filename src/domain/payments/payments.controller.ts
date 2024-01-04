import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'auth/decorators/user.decorator';
import { RequestUser } from 'auth/interfaces/request-user.interface';
import { IdDto } from 'common/dto/id.dto';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':id')
  payOrder(@Param() { id }: IdDto, @User() user: RequestUser) {
    return this.paymentsService.payOrder(id, user);
  }
}
