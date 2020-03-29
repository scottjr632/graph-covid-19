import { ClassType, ObjectType, Field } from 'type-graphql';

export function PaginatedResponse<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field()
    total: number;
    @Field((type) => [TClass])
    data: T[];
    @Field({ nullable: true })
    limit?: number;
    @Field({ nullable: true })
    start?: number;
  }
  return PaginatedResponseClass;
}

export default PaginatedResponse;
