import { Type } from '@nestjs/common';
import { MockProxy, mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';

export type MockRepository = MockProxy<Repository<any>>;
export const createMockRepository = () => mock<Repository<any>>();

export type MockClass<T extends Type> = MockProxy<InstanceType<T>>;
export const createMockInstance = <T extends Type>(Class: T) =>
  mock<typeof Class>();
