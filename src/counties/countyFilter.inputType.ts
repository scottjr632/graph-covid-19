import { InputType, Field } from 'type-graphql';

import { CovidInputType } from '../common/covid/covidFilter.inputType';

@InputType()
export class CountyFilter extends CovidInputType {
  @Field({ nullable: true })
  county?: string;
}