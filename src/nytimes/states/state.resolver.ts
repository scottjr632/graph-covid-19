import { Resolver, Query, FieldResolver, Root, Arg } from 'type-graphql';

import { NYTimesService } from '../../services/nytimes/nytimes.service';

import { State } from './state.type';
import { StateFilter } from './stateFilter.inputType';
import { PaginatedStateResponse } from './paginated-states.type';

@Resolver(State)
export class StateResolver {
  constructor(private readonly nytService: NYTimesService) {}

  @Query(() => PaginatedStateResponse, {
    description: 'State data provided by NY Times',
  })
  async states(
    @Arg('filter', { nullable: true }) filter?: StateFilter
  ): Promise<PaginatedStateResponse> {
    let res = await this.nytService.getStateDateByFilter(filter);
    if (filter?.sort) {
      res = this.nytService.sortByFilter(res, filter);
    }

    return {
      total: res.length,
      nodes: res,
    };
  }

  @FieldResolver()
  hash(@Root() root: State): string {
    return root.getHash();
  }
}
