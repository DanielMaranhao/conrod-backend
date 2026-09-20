import { IdDto } from '#/common/dto/id.dto.js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import { Roles } from './decorators/roles.decorator.js';
import { User } from './decorators/user.decorator.js';
import { CredentialsDto } from './dto/credentials.dto.js';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard.js';
import type { AuthUser } from './interfaces/auth-user.interface.js';
import { RoleDto } from './roles/dto/role.dto.js';
import { Role } from './roles/enums/role.enum.js';
import { JwtCookieHeader } from './swagger/jwt-cookie.header.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CredentialsDto })
  @ApiOkResponse({ headers: JwtCookieHeader })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(
    @User() user: AuthUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.authService.login(user);
    response.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  @Get('profile')
  getProfile(@User() { id }: AuthUser) {
    return this.authService.getProfile(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id/assign-role')
  assignRole(@Param() { id }: IdDto, @Body() { role }: RoleDto) {
    return this.authService.assignRole(id, role);
  }
}
