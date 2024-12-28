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
import { Public } from 'auth/decorators/public.decorator';
import { Roles } from 'auth/decorators/roles.decorator';
import { User as CurrentUser } from 'auth/decorators/user.decorator';
import { LoginDto } from 'auth/dto/login.dto';
import { RequestUser } from 'auth/interfaces/request-user.interface';
import { Role } from 'auth/roles/enums/role.enum';
import { IdDto } from 'common/dto/id.dto';
import { RemoveDto } from 'common/dto/remove.dto';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { ApiPaginatedResponse } from 'querying/swagger/decorators/api-paginated-response.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiPaginatedResponse(User)
  @Roles(Role.MANAGER)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Roles(Role.MANAGER)
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  @Public()
  @Patch('recover')
  recover(@Body() loginDto: LoginDto) {
    return this.usersService.recover(loginDto);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(
    @Param() { id }: IdDto,
    @Query() { soft }: RemoveDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.usersService.remove(id, soft, user);
  }
}
