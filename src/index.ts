import configs from './configs/configurations';
import cookieParser from 'cookie-parser';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import { authChecker } from './helpers';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import { sequelize } from './configs/db.config';

const app: Express = express();

app.use(cookieParser());

const APP_PORT = configs.APP_PORT;

async function startServer() {
  try {
    await sequelize.sync({
      // force: true,
    });
    // await sequelize.authenticate();
    // .then(() => {
    //   // const actor: CreateActorDto = {
    //   //   name: 'Jean Paul',
    //   // };
    //   // return add(actor);
    //   // return find();
    // })
    // .then((res) => console.log(res));

    const schema = await buildSchema({
      resolvers: [
        path.join(__dirname, './models/**/resolver/*.resolver.{ts,js}'),
      ],
      validate: true,
      emitSchemaFile: path.resolve(__dirname, 'snapshots/schema', 'schema.gql'),
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

    app.listen(APP_PORT, () => {
      console.log(
        `⚡️[server]: The server is running at http://localhost:${APP_PORT}`,
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
