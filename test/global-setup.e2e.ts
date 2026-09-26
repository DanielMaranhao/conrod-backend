import { execSync } from 'child_process';

const BASE_COMMAND = 'docker compose -f test/compose.yml --env-file test/.env';

const compose = (command: string) => {
  execSync(`${BASE_COMMAND} ${command}`, { stdio: 'inherit' });
};

export function setup() {
  compose('up -d');
}

export function teardown() {
  compose('rm -sfv');
}
