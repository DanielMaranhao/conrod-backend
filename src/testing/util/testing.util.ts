import { Type } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { MockProxy, mock } from 'vitest-mock-extended';

export type MockRepository<TEntity extends ObjectLiteral> = MockProxy<
  Repository<TEntity>
>;

export type MockClass<TClass extends Type> = MockProxy<InstanceType<TClass>>;

export const createMock = () => mock();
