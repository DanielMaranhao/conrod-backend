import { ExtendedClsStore } from '#/als/interfaces/cls-store.interface.js';
import { User } from '#d/users/entities/user.entity.js';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service.js';
import { AuthUser } from './interfaces/auth-user.interface.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { Role } from './roles/enums/role.enum.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly cls: ClsService<ExtendedClsStore>,
  ) {}

  async validateLocal(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      select: { id: true, password: true },
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.createAuthUser(user);
  }

  async validateJwt(payload: JwtPayload) {
    const user = await this.usersRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.createAuthUser(user);
  }

  async login() {
    const user = this.cls.get('user');
    const payload: JwtPayload = { sub: user.id };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async assignRole(id: number, role: Role) {
    const user = await this.usersRepository.preload({ id, role });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  private createAuthUser(user: User): AuthUser {
    const { id, role } = user;
    return { id, role };
  }
}
