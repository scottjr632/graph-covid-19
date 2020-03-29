import { InputType, Field } from 'type-graphql';

import { Direction } from './direction.enum';
import { SortBy } from './covidFilter.enum';

const DEFAULT_LAST = 100;

@InputType()
export class SortCovidInputType {
  @Field(() => SortBy)
  sortBy: SortBy;
  @Field(() => Direction, { defaultValue: Direction.ASC })
  direction: Direction;
}

@InputType()
export class CovidInputType {
  @Field({ defaultValue: DEFAULT_LAST })
  last: number;

  @Field({ nullable: true })
  from?: Date;
  @Field({ nullable: true })
  state?: string;
  @Field(() => SortCovidInputType, { nullable: true })
  sort?: SortCovidInputType;
}
