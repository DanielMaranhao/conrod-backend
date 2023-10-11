import { IsEmail, IsPhoneNumber, Length } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';

export class CreateUserDto {
  @Length(2, 50)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('BR')
  readonly phone: string;

  @IsPassword()
  readonly password: string;
}
