import { ObjectType, Field } from 'type-graphql';

import { PaginatedJHUDataResponse } from './data/paginated-jhu.type';

@ObjectType()
export class JHU {
  @Field(() => PaginatedJHUDataResponse)
  data: PaginatedJHUDataResponse;
}
