import 'reflect-metadata';

import path from 'path';

import Container from 'typedi';
import { buildSchema } from 'type-graphql';

import { StateResolver } from './states/state.resolver';
import { CountyResolver } from './counties/county.resolver';
import datasource, { Datasource } from './services/nytimes/datasource';

let source: Datasource;

const resolvers = [
  StateResolver,
  CountyResolver,
];

export const createSchema = async () => {
  if (!source) {
    source = await datasource.initializeData();
  }

  return buildSchema({
    resolvers,
    container: Container,
    validate: false,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });
};