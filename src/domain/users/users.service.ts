import { CredentialsDto } from '#/auth/dto/credentials.dto.js';
import { HashingService } from '#/auth/hashing/hashing.service.js';
import { AuthUser } from '#/auth/interfaces/auth-user.interface.js';
import { Role } from '#/auth/roles/enums/role.enum.js';
import { compareUserId } from '#/auth/util/authorization.util.js';
import { PaginationDto } from '#/querying/dto/pagination.dto.js';
import { PaginationService } from '#/querying/pagination.service.js';
import { DefaultPageSize } from '#/querying/util/querying.constants.js';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly paginationService: PaginationService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.USERS;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.usersRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);

    return { data, meta };
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id },
      relations: { orders: { items: true, payment: true } },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto, authUser: AuthUser) {
    if (authUser.role !== Role.ADMIN) {
      compareUserId(authUser.id, id);
    }

    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number, soft: boolean, authUser: AuthUser) {
    if (authUser.role !== Role.ADMIN) {
      compareUserId(authUser.id, id);
      if (!soft) {
        throw new ForbiddenException('Forbidden resource');
      }
    }

    const user = await this.findOne(id);
    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { orders: { items: true, payment: true } },
      withDeleted: true,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isDeleted) {
      throw new ConflictException('User not deleted');
    }

    return this.usersRepository.recover(user);
  }
}
