import { Public } from '#/auth/decorators/public.decorator.js';
import { Roles } from '#/auth/decorators/roles.decorator.js';
import { CredentialsDto } from '#/auth/dto/credentials.dto.js';
import { Role } from '#/auth/roles/enums/role.enum.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { RemoveDto } from '#/common/dto/remove.dto.js';
import { PaginationDto } from '#/querying/dto/pagination.dto.js';
import { ApiPaginatedResponse } from '#/querying/swagger/decorators/api-paginated-response.decorator.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiPaginatedResponse(User)
  @Roles([Role.MANAGER])
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Roles([Role.MANAGER])
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  @Public()
  @Patch('recover')
  recover(@Body() credentialsDto: CredentialsDto) {
    return this.usersService.recover(credentialsDto);
  }

  @Roles([Role.ADMIN])
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles([Role.ADMIN])
  @Delete(':id')
  remove(@Param() { id }: IdDto, @Query() { soft }: RemoveDto) {
    return this.usersService.remove(id, soft);
  }
}
