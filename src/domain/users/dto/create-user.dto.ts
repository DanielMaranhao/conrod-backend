import { IsEmail, IsPhoneNumber, Length } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsAlphaWithSpaces } from 'common/decorators/validators/text-validation/is-alpha-with-spaces.decorator';

export class CreateUserDto {
  @IsAlphaWithSpaces()
  @Length(2, 50)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('BR')
  readonly phone: string;

  /**
   * Requires:
   * 1. 8 to 20 characters
   * 2. At least one
   * - Lowercase letter
   * - Uppercase letter
   * - Number
   * - Special character
   */
  @IsPassword()
  readonly password: string;
}
