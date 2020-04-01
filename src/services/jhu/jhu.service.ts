import { Service } from 'typedi';

import { Direction } from '../../common/direction.enum';

import { CovidInputType } from './../../common/covid/covidFilter.inputType';

import { Data } from './types';
import datasource from './datasource';
import { SortCovidInputType } from './../../common/covid/sortCovid.type';

interface JHUFilter extends CovidInputType {
  country?: string;
}

@Service()
export class JHUService {
  public getAllData() {
    return datasource.getData();
  }

  public getDataFromFilter(filter?: JHUFilter) {
    return this.filterByInput(datasource.getData(), filter);
  }

  public sortByFilter(data: Data[], sort?: SortCovidInputType) {
    if (!sort) {
      return data;
    }

    const { sortBy, direction } = sort;
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

  private filterByInput<
    T extends { country: string; state: string; date: string }
  >(data: T[], args?: JHUFilter) {
    if (!args) {
      return data;
    }

    const { last, from, state, country } = args;
    if (last) {
      data = this.filterLastData(data, last);
    }

    if (from) {
      data = this.filterFromDate(data, from);
    }

    if (state) {
      data = this.filterByState(data, state);
    }

    if (country) {
      data = this.filterByCountry(data, country);
    }

    return data;
  }

  private filterByCountry<T extends { country: string }>(
    data: T[],
    country: string
  ) {
    return data.filter(
      (v) => v.country.toLowerCase() === country.toLowerCase()
    );
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
