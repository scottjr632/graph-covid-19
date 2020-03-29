import crypto from 'crypto';

import { ObjectType, Field } from 'type-graphql';

import { CovidBase } from './../common/covidBase.type';

@ObjectType()
export class County extends CovidBase {
  @Field()
  county: string;

  @Field()
  state: string;

  public getHash(): string {
    return crypto
      .createHash('md5')
      .update(`${this.state}-${this.date}`)
      .digest('hex');
  }
}
