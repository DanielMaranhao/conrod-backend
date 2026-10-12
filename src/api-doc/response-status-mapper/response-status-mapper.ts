import { Roles } from '#/auth/decorators/roles.decorator.js';
import { Injectable, OnApplicationBootstrap, Type } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Injectable()
export class ResponseStatusMapper implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onApplicationBootstrap() {
    const controllers = this.discoveryService.getControllers();

    for (const wrapper of controllers) {
      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);

      const routeNames = this.metadataScanner.getAllMethodNames(prototype);
      const routes = routeNames.map((name) => instance[name] as Function);

      const controller = instance.constructor as Type;

      for (const route of routes) {
        this.mapUnauthorized(route);
        this.mapForbidden(route, controller);
      }
    }
  }

  private mapUnauthorized(route: Function) {
    ApiUnauthorizedResponse({ description: 'Unauthorized' })(route);
  }

  private mapForbidden(route: Function, controller: Type) {
    const requiredRoles = this.reflector.getAllAndOverride(Roles, [
      route,
      controller,
    ]);
    if (!requiredRoles) return;

    ApiForbiddenResponse({ description: 'Forbidden' })(route);
  }
}
