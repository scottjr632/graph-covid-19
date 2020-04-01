import axios from 'axios';
import parse from 'csv-parse/lib/sync';

import { DatasourceInterface } from '../../common/datasourceInterface';

import { Data, ResponseData, GHResponse } from './types';
import { DAILY_BASE_URL } from './constants';

const getGithubFile = async () => {
  const res = await axios.get<GHResponse[]>(DAILY_BASE_URL);
  const { data } = res;
  while (data.length >= 0) {
    const item = data[data.length - 1];
    if (item.name.toLowerCase() !== 'readme.md') {
      return axios.get(item.download_url);
    }
    data.pop();
  }
};

const getTodaysReport = async (): Promise<ResponseData[]> => {
  const res = await getGithubFile();
  return parse(res.data, {
    delimiter: ',',
    skip_empty_lines: true,
    columns: true,
  });
};

const toData = (responseData: ResponseData[]): Data[] => {
  return responseData.map((data) => {
    return {
      fips: data.FIPS,
      lat: data.Lat,
      long: data.Long_,
      deaths: data.Deaths,
      recovered: data.Recovered,
      cases: data.Active,
      state: data.Province_State,
      country: data.Country_Region,
      date: data.Last_Update,
      hash: '',
      getHash: () => null,
    };
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

  private data: Data[];
  public async initializeData(): Promise<Datasource> {
    const data = await getTodaysReport();
    this.data = toData(data);
    return this;
  }

  public getData() {
    return this.data;
  }
}

export default Datasource.getInstance();

/*

  timeseries {
    date
    deaths
    active
  }

*/
