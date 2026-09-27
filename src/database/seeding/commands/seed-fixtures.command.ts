import { log } from 'console';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'seed:fixtures' })
export class SeedFixturesCommand extends CommandRunner {
  async run() {
    log('Hello World!');
  }
}
