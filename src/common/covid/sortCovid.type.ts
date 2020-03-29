import { InputType, Field } from 'type-graphql';

import { Direction } from '../direction.enum';

import { SortBy } from './covidFilter.enum';

@InputType()
export class SortCovidInputType {
  @Field(() => SortBy)
  sortBy: SortBy;
  @Field(() => Direction, { defaultValue: Direction.ASC })
  direction: Direction;
}