import { CredentialsDto } from '#/auth/dto/credentials.dto.js';
import { validateDto } from '#/common/util/validation.util.js';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isObservable, lastValueFrom } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const { body } = context.switchToHttp().getRequest<Request>();
    await validateDto(CredentialsDto, body);

    const result = super.canActivate(context);
    return isObservable(result) ? lastValueFrom(result) : result;
  }
}
