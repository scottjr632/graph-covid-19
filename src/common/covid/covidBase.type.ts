import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export abstract class CovidBase {
  @Field()
  hash: string;

  @Field()
  date: string;

  @Field()
  cases: number;

  @Field()
  deaths: number;

  @Field()
  fips: string;

  /**
   * getHash returns the has for the object
   */
  abstract getHash(): string;
}
