import ms, { type StringValue } from 'ms';
import { z, type ZodType } from 'zod';

// Zod Extended
export const ze = {
  cardinal: z.coerce.number().int().positive(),
  port: z.coerce.number().int().min(1).max(65535),
  ms: z.string().refine((value) => isMs(value), {
    error: 'must be a string in ms format',
  }),
} as const satisfies Record<string, ZodType>;

const isMs = (value: string) => ms(value as StringValue) !== undefined;
