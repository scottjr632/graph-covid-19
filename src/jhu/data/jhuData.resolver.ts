import { Resolver, FieldResolver, Root } from 'type-graphql';

import { JHUData } from './jhuData.type';

@Resolver(JHUData)
export class JHUDataResolver {
  @FieldResolver()
  hash(@Root() root: JHUData): string {
    return root.getHash();
  }
}
