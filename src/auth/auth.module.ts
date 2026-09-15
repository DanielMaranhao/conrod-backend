import { User } from '#d/users/entities/user.entity.js';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import jwtConfig from './config/jwt.config.js';
import throttlerConfig from './config/throttler.config.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles/roles.guard.js';
import { BcryptService } from './hashing/bcrypt.service.js';
import { HashingService } from './hashing/hashing.service.js';
import { ValidationMiddleware } from './middleware/validation/validation.middleware.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { LocalStrategy } from './strategies/local.strategy.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({}),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ThrottlerModule.forRootAsync(throttlerConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashingService, useClass: BcryptService },
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [HashingService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware(LoginDto)).forRoutes('auth/login');
  }
}
