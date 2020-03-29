import { registerEnumType } from 'type-graphql';
export enum Direction {
  ASC = 1,
  DESC = 0,
}

registerEnumType(Direction, { name: 'Direction' });
