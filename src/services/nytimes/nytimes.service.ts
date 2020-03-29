import { Service } from 'typedi';

import { Direction } from '../../common/direction.enum';
import { CovidInputType } from '../../common/covid/covidFilter.inputType';

import nytdatasource from './datasource';
import { County, State } from './types';

interface CountyInputType extends CovidInputType {
  county?: string;
}

@Service()
export class NYTimesService {
  public getAllCountyData(): County[] {
    return nytdatasource.getCountyData();
  }

  public getAllStateData(): State[] {
    return nytdatasource.getStateData();
  }

  public getStateDateByFilter(filter?: CovidInputType) {
    return this.filterByInput(this.getAllStateData(), filter);
  }

  public getCountyDataByFilter(filter?: CountyInputType) {
    return this.filterByInput(this.getAllCountyData(), filter);
  }

  public sortByFilter(data: any[], filter?: CountyInputType) {
    if (!filter) {
      return data;
    }

    const { sortBy, direction } = filter.sort;
    data = data.sort((a, b) => {
      if (+a[sortBy] > +b[sortBy]) {
        return direction === Direction.DESC ? 1 : -1;
      }
      if (+a[sortBy] < +b[sortBy]) {
        return direction === Direction.DESC ? -1 : 1;
      }
      return 0;
    });
    return data;
  }

  private filterByInput<T extends { state: string; date: string }>(
    data: T[],
    args?: CountyInputType
  ) {
    if (!args) {
      return data;
    }

    const { last, from, state, county } = args;
    if (last) {
      data = this.filterLastData(data, last);
    }

    if (from) {
      data = this.filterFromDate(data, from);
    }

    if (state) {
      data = this.filterByState(data, state);
    }

    if (county) {
      data = this.filterByCounty(data, county);
    }
    return data;
  }

  private filterByCounty(data: any[], county: string) {
    return data.filter((v) => v.county.toLowerCase() === county.toLowerCase());
  }

  private filterByState<T extends { state: string }>(data: T[], state: string) {
    return data.filter((v) => v.state.toLowerCase() === state.toLowerCase());
  }

  private filterFromDate<T extends { date: string }>(data: T[], from: Date) {
    return data.filter((v) => new Date(v.date).getTime() - from.getTime() > 0);
  }

  private filterLastData<T>(data: T[], last: number): T[] {
    if (last >= data.length) {
      return data;
    }
    return data.slice(data.length - last, data.length);
  }
}
