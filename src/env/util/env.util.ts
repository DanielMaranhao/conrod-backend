import ms, { type StringValue } from 'ms';
import { z, type ZodType } from 'zod';

const isMs = (value: string) => ms(value as StringValue) !== undefined;
const msError = 'must be a string in ms format';

// Zod Extended
export const ze = {
  cardinal: z.coerce.number().int().positive(),
  port: z.coerce.number().int().min(1).max(65535),
  ms: z.string().refine(isMs, { error: msError }),
} as const satisfies Record<string, ZodType>;
