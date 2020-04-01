import { InputType, Field } from 'type-graphql';

import { CovidInputType } from '../common/covid/covidFilter.inputType';

@InputType()
export class JHUFilter extends CovidInputType {
  @Field({ nullable: true })
  country?: string;
}
