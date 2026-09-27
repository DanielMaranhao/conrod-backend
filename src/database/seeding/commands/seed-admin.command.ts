import { Command, CommandRunner } from 'nest-commander';
import { SeedingService } from '../seeding.service.js';

@Command({ name: 'seed:admin' })
export class SeedAdminCommand extends CommandRunner {
  constructor(private readonly seedingService: SeedingService) {
    super();
  }

  async run() {
    await this.seedingService.seedAdmin();
  }
}
