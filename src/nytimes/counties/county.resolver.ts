import { Resolver, Query, FieldResolver, Root, Arg } from 'type-graphql';

import { NYTimesService } from '../../services/nytimes/nytimes.service';

import { PaginatedCountyResponse } from './paginated-counties.type';
import { County } from './county.type';
import { CountyFilter } from './countyFilter.inputType';

@Resolver(County)
export class CountyResolver {
  constructor(private readonly nytService: NYTimesService) {}

  @Query(() => PaginatedCountyResponse, {
    description: 'County data provided ny NY Times',
  })
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

  @FieldResolver()
  hash(@Root() root: County): string {
    return root.getHash();
  }
}
