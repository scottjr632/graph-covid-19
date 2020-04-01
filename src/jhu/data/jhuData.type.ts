import crypto from 'crypto';

import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class JHUData {
  @Field({ nullable: true })
  fips?: string;
  @Field()
  lat: string;
  @Field()
  long: string;
  @Field()
  deaths: number;
  @Field()
  recovered: number;
  @Field()
  country: string;
  @Field({ nullable: true, description: 'Represents a PROVINCE or STATE' })
  state: string;
  @Field()
  date: string;

  @Field({ nullable: true })
  hash: string;

  @Field()
  cases: number;

  public getHash(): string {
    return crypto
      .createHash('md5')
      .update(`${this.state}-${this.date}`)
      .digest('hex');
  }
}
