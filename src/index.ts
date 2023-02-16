import configs from './configs/configurations';
import { Request, Response } from 'express';
import path from 'path';
import { authChecker } from './helpers';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import { sequelize } from './configs/db.config';

import app from './app';

const APP_PORT = configs.APP_PORT;

app.listen(APP_PORT, async () => {
  await sequelize.sync({
    // force: true,
  });

  const schema = await buildSchema({
    resolvers: [
      path.join(__dirname, './models/**/resolver/*.resolver.{ts,js}'),
    ],
    validate: true,
    // emitSchemaFile: path.resolve(__dirname, 'snapshots/schema', 'schema.gql'),
    authChecker,
  });

  const endpoints = [
    { path: '/graphql', graphiql: false },
    { path: '/graphiql', graphiql: true },
  ];

  endpoints.forEach((endpoint) => {
    app.use(
      endpoint.path,
      graphqlHTTP((req: Request, res: Response) => {
        return {
          schema,
          context: {
            req,
            res,
          },
          graphiql: endpoint.graphiql,
        };
      }),
    );
  });

  console.log(
    `⚡️[server]: The server is running at http://localhost:${APP_PORT}`,
  );
});
