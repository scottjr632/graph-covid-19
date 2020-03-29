import 'reflect-metadata';
import path from 'path';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { StateResolver } from './states/state.resolver';
import { CountyResolver } from './counties/county.resolver';

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const schema = await buildSchema({
    container: Container,
    validate: false,
    resolvers: [StateResolver, CountyResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.info(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
