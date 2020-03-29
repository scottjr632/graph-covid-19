export interface State {
  date: string;
  state: string;
  fips: string;
  cases: number;
  deaths: number;

  hash: string;
  getHash(): string;
}

export interface County extends State {
  county: string;
}
