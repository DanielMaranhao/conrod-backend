import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ROLES_KEY } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/roles/enums/role.enum';

@Injectable()
export class DocsForbiddenMapper implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const controllers = this.discoveryService.getControllers();

    controllers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);

      const routeNames = this.metadataScanner.getAllMethodNames(prototype);

      const isControllerProtected = !!this.reflector.get<Role[]>(
        ROLES_KEY,
        instance.constructor,
      );
      if (isControllerProtected) {
        routeNames.forEach((name) => {
          const route = instance[name];
          ApiForbiddenResponse({ description: 'Forbidden' })(route);
        });
        return;
      }

      routeNames.forEach((name) => {
        const route = instance[name];

        const isProtected = !!this.reflector.get<Role[]>(ROLES_KEY, route);
        if (!isProtected) return;

        ApiForbiddenResponse({ description: 'Forbidden' })(route);
      });
    });
  }
}