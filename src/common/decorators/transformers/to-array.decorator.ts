import { Transform } from 'class-transformer';

const toArray = (value: unknown) => (Array.isArray(value) ? value : [value]);

export const ToArray = () => Transform(({ value }) => toArray(value));
