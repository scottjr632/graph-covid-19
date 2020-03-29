import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
} from 'type-graphql';

import { NYTimesService } from '../services/nytimes/nytimes.service';

import { State } from './state.type';
import { StateFilter } from './stateFilter.inputType';
import { PaginatedStateResponse } from './paginated-states.type';

@Resolver(State)
export class StateResolver {
  constructor(private readonly nytService: NYTimesService) {}

  @Query(() => PaginatedStateResponse)
  async getStates(
    @Arg('filter', { nullable: true }) filter?: StateFilter
  ): Promise<PaginatedStateResponse> {
    let res = this.nytService.getStateDateByFilter(filter);
    if (filter?.sort) {
      res = this.nytService.sortByFilter(res, filter);
    }

    return {
      total: res.length,
      data: res,
    };
  }

  @FieldResolver()
  hash(@Root() root: State): string {
    return root.getHash();
  }
}
