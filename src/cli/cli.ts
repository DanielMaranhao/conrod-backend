import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module.js';

async function bootstrap() {
  await CommandFactory.run(CliModule, ['warn', 'error']);
}
await bootstrap();
