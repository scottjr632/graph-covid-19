import { registerEnumType } from 'type-graphql';

export enum SortBy {
  DATE = 'date',
  CASES = 'cases',
  DEATHS = 'deaths',
}

registerEnumType(SortBy, {
  name: 'SortCovidBy',
});
