import crypto from 'crypto';

import { ObjectType, Field } from 'type-graphql';

import { CovidBase } from '../../common/covid/covidBase.type';

@ObjectType()
export class State extends CovidBase {
  @Field()
  state: string;

  public getHash(): string {
    return crypto
      .createHash('md5')
      .update(`${this.state}-${this.date}`)
      .digest('hex');
  }
}
