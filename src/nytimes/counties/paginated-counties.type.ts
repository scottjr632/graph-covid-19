import { ObjectType } from 'type-graphql';

import PaginatedResponse from '../../common/paginateResponse.type';

import { County } from './county.type';

@ObjectType()
export class PaginatedCountyResponse extends PaginatedResponse(County) {}
export default PaginatedCountyResponse;
