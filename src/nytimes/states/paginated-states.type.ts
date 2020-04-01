import { ObjectType } from 'type-graphql';

import PaginatedResponse from '../../common/paginateResponse.type';

import { State } from './state.type';

@ObjectType()
export class PaginatedStateResponse extends PaginatedResponse(State) {}
export default PaginatedStateResponse;
