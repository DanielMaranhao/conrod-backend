import { defineConfig } from 'oxlint';

export default defineConfig({
  rules: {
    'typescript/no-explicit-any': 'off',
    'typescript/no-floating-promises': 'warn',
    'typescript/no-misused-spread': 'off',
  },
  env: { node: true },
  options: { typeAware: true },
});
