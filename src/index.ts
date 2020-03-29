import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema';

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = express();
  const server = new ApolloServer({
    schema: await schema(),
    introspection: true,
    playground: true,
    engine: false,
  });

  app.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms'));
  server.applyMiddleware({ app, path: '/' });

  app.listen(PORT, () => {
    console.info(`Server listening on port :${PORT}`);
  });
}

bootstrap();
