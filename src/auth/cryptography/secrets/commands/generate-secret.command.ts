import { isInt, isPositive, max } from 'class-validator';
import { log } from 'console';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Encoding, SecretsService } from '../secrets.service.js';

interface Options {
  bytes: number;
  encoding: Encoding;
}

@Command({ name: 'generate:secret' })
export class GenerateSecretCommand extends CommandRunner {
  constructor(private readonly secretsService: SecretsService) {
    super();
  }

  async run(_: string[], options: Options) {
    const { bytes, encoding } = options;

    const secret = this.secretsService.generateSecret(bytes, encoding);
    log(secret);
  }

  @Option({ flags: '-e, --encoding <string>', required: true })
  parseEncoding(value: string) {
    this.validateEncoding(value);

    return value;
  }

  private validateEncoding(value: string) {
    if (!Encoding.includes(value as Encoding)) {
      throw new Error(`Encoding must be one of: ${Encoding.join()}`);
    }
  }

  @Option({ flags: '-b, --bytes <number>', defaultValue: 32 })
  parseBytes(value: string) {
    const parsedValue = +value;
    this.validateBytes(parsedValue);

    return parsedValue;
  }

  private validateBytes(value: number) {
    if (!isInt(value)) throw new Error('Bytes must be an integer');
    if (!isPositive(value)) throw new Error('Bytes must be positive');
    if (!max(value, 64)) throw new Error('Bytes must be no greater than 64');
  }
}
