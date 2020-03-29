import { InputType } from 'type-graphql';

import { CovidInputType } from '../common/covid/covidFilter.inputType';

@InputType()
export class StateFilter extends CovidInputType {}
