import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import { schema } from './schema';

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const server = new ApolloServer({
    schema: await schema(),
    introspection: true,
    playground: true,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.info(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
