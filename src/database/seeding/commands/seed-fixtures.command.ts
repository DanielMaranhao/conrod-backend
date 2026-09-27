import { Command, CommandRunner } from 'nest-commander';
import { SeedingService } from '../seeding.service.js';

@Command({ name: 'seed:fixtures' })
export class SeedFixturesCommand extends CommandRunner {
  constructor(private readonly seedingService: SeedingService) {
    super();
  }

  async run() {
    await this.seedingService.seedFixtures();
  }
}
