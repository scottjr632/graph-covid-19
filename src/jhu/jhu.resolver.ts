import { Resolver, Query, Arg } from 'type-graphql';

import { JHU } from './jhu.type';

import { JHUService } from './../services/jhu/jhu.service';
import { JHUFilter } from './jhuFilter.inputType';

@Resolver(JHU)
export class JHUResolver {
  constructor(private readonly jhuService: JHUService) {}
  @Query(() => JHU)
  jhu(@Arg('filter', { nullable: true }) filter?: JHUFilter): JHU {
    const res = this.jhuService.getDataFromFilter(filter);
    return {
      data: {
        total: res.length,
        nodes: res,
      },
    };
  }
}
