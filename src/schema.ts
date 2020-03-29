import path from 'path';

import Container from 'typedi';
import { buildSchema } from 'type-graphql';

import { StateResolver } from './states/state.resolver';
import { CountyResolver } from './counties/county.resolver';

const resolvers = [
  StateResolver,
  CountyResolver,
];

export const schema = async () => buildSchema({
  resolvers,
  container: Container,
  validate: false,
  emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
});