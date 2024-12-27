import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IS_PUBLIC_KEY } from 'auth/decorators/public.decorator';

@Injectable()
export class DocsUnauthorizedMapper implements OnApplicationBootstrap {
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

      const isControllerPublic = this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        instance.constructor,
      );
      if (isControllerPublic) return;

      const routeNames = this.metadataScanner.getAllMethodNames(prototype);

      routeNames.forEach((name) => {
        const route = instance[name];

        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, route);
        if (isPublic) return;

        ApiUnauthorizedResponse({ description: 'Unauthorized' })(route);
      });
    });
  }
}
