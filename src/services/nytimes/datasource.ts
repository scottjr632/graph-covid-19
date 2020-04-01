import parse from 'csv-parse/lib/sync';
import axios from 'axios';

import { DatasourceInterface } from '../../common/datasourceInterface';

import { County, State } from './types';
import { COUNTY_SOURCE, STATE_SOURCE } from './constants';

const getCountyData = async (): Promise<County[]> => {
  const res = await axios.get(COUNTY_SOURCE);
  return parse(res.data, {
    delimiter: ',',
    skip_empty_lines: true,
    columns: true,
  });
};

const getStateData = async (): Promise<State[]> => {
  const res = await axios.get(STATE_SOURCE);
  return parse(res.data, {
    delimiter: ',',
    skip_empty_lines: true,
    columns: true,
  });
};

export class Datasource implements DatasourceInterface {
  private static instance: Datasource;

  public static getInstance(): Datasource {
    if (!this.instance) {
      this.instance = new Datasource();
    }
    return this.instance;
  }

  private countyData: County[] = [];
  private stateData: State[] = [];

  public async initializeData(): Promise<Datasource> {
    const countyData = await getCountyData();
    const stateData = await getStateData();
    this.countyData = countyData;
    this.stateData = stateData;
    return this;
  }

  public getCountyData(): County[] {
    return this.countyData;
  }
  public getStateData(): State[] {
    return this.stateData;
  }
}

export default Datasource.getInstance();
