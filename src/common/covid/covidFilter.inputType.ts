import { InputType, Field } from 'type-graphql';

import { SortCovidInputType } from './sortCovid.type';

const DEFAULT_LAST = 100;

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
