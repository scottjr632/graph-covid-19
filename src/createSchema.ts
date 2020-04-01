import 'reflect-metadata';
import path from 'path';

import Container from 'typedi';
import { buildSchema } from 'type-graphql';

import { DatasourceInterface } from './common/DatasourceInterface';

import nytDatasource from './services/nytimes/datasource';
import jhuDatasource from './services/jhu/datasource';

import { JHUResolver } from './jhu/jhu.resolver';
import { JHUDataResolver } from './jhu/data/jhuData.resolver';
import { StateResolver } from './nytimes/states/state.resolver';
import { NYTimesDataResolver } from './nytimes/nytimes.resolver';
import { CountyResolver } from './nytimes/counties/county.resolver';

let source: DatasourceInterface[];

const resolvers = [
  StateResolver,
  CountyResolver,
  NYTimesDataResolver,
  JHUResolver,
  JHUDataResolver,
];

export const createSchema = async () => {
  if (!source) {
    source = await Promise.all([
      nytDatasource.initializeData(),
      jhuDatasource.initializeData(),
    ]);
  }

  return buildSchema({
    resolvers,
    container: Container,
    validate: false,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });
};
