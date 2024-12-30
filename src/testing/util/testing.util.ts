import { Type } from '@nestjs/common';
import { MockProxy, mock } from 'jest-mock-extended';
import { ObjectLiteral, Repository } from 'typeorm';

export type MockRepository<TEntity extends ObjectLiteral> = MockProxy<
  Repository<TEntity>
>;

export type MockClass<TClass extends Type> = MockProxy<InstanceType<TClass>>;

export const createMock = () => mock();
