import { ObjectType } from 'type-graphql';

import PaginatedResponse from '../../common/paginateResponse.type';

import { JHUData } from './jhuData.type';

@ObjectType()
export class PaginatedJHUDataResponse extends PaginatedResponse(JHUData) {}
export default PaginatedJHUDataResponse;
