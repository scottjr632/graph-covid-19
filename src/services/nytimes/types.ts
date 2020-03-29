interface Base {
  date: string;
  state: string;
  fips: number;
  cases: number;
  deaths: number;

  hash: string;
  getHash(): string;
}

export interface County extends Base {
  county: string;
}

export interface State extends Base {}
