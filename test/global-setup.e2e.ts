import { execSync } from 'child_process';

const BASE_COMMAND = 'docker compose --env-file test/.env -f test/compose.yml';

const compose = (command: string) => {
  execSync(`${BASE_COMMAND} ${command}`, { stdio: 'inherit' });
};

export function setup() {
  compose('up -d');
}

export function teardown() {
  compose('rm -sfv');
}
