import { ObjectType, Field } from 'type-graphql';

import { PaginatedStateResponse } from './states/paginated-states.type';
import { PaginatedCountyResponse } from './counties/paginated-counties.type';

@ObjectType()
export class NYTimes {
  @Field(() => PaginatedCountyResponse)
  counties: PaginatedCountyResponse;
  @Field(() => PaginatedStateResponse)
  states: PaginatedStateResponse;
}
