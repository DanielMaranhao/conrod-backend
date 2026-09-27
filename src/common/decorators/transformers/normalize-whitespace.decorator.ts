import { Transform } from 'class-transformer';

const normalizeWhitespace = (value: unknown) => {
  if (typeof value !== 'string') return value;

  return value.trim().replace(/\s+/g, ' ');
};

export const NormalizeWhitespace = () =>
  Transform(({ value }) => normalizeWhitespace(value));
