export interface ResponseData {
  FIPS: string;
  Admin2: string;
  Province_State: string;
  Country_Region: string;
  Last_Update: string;
  Lat: string;
  Long_: string;
  Confirmed: string;
  Deaths: number;
  Recovered: number;
  Active: number;
  Combined_Key: string;
}

export interface Data {
  fips: string;
  lat: string;
  long: string;
  deaths: number;
  recovered: number;
  cases: number;
  country: string;
  state: string;
  date: string;

  hash: string;
  getHash(): string;
}

export interface GHResponse {
  name: string
  download_url: string
}