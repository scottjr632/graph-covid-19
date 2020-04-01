import { Resolver, Query, FieldResolver, Arg } from 'type-graphql';

import { NYTimesService } from '../services/nytimes/nytimes.service';

import { NYTimes } from './nytimes.type';
import { StateFilter } from './states/stateFilter.inputType';
import { CountyFilter } from './counties/countyFilter.inputType';
import { PaginatedStateResponse } from './states/paginated-states.type';
import { PaginatedCountyResponse } from './counties/paginated-counties.type';

@Resolver(NYTimes)
export class NYTimesDataResolver {
  constructor(private readonly nytService: NYTimesService) {}

  @Query(() => NYTimes)
  async nytimes() {
    return {};
  }

  @FieldResolver(() => PaginatedCountyResponse)
  async counties(
    @Arg('filter', { nullable: true }) filter?: CountyFilter
  ): Promise<PaginatedCountyResponse> {
    let res = await this.nytService.getCountyDataByFilter(filter);
    if (filter?.sort) {
      res = this.nytService.sortByFilter(res, filter);
    }

    return {
      total: res.length,
      nodes: res,
    };
  }

  @FieldResolver(() => PaginatedStateResponse)
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
}
