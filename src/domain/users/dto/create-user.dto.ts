import { NormalizeWhitespace } from '#/common/decorators/transformers/normalize-whitespace.decorator.js';
import { IsPassword } from '#/common/decorators/validators/is-password.decorator.js';
import { IsName } from '#/common/decorators/validators/text/index.js';
import { IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
  @IsName()
  @Length(2, 50)
  @NormalizeWhitespace()
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
