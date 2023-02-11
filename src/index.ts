import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import configs from './configs/configurations';
import { sequelize } from './configs/db.config';
import { ActorResolver } from './models/actor/resolver/actor.resolver';

const app: Express = express();

const APP_PORT = configs.APP_PORT;

(async () => {
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

    app.use(
      '/graphql',
      // Creates a GraphQLHTTP per request
      graphqlHTTP({
        schema: await buildSchema({
          resolvers: [ActorResolver],
          validate: true,
        }),
        graphiql: true,
      }),
    );

    app.listen(APP_PORT, () => {
      console.log(
        `⚡️[server]: The server is running at http://localhost:${APP_PORT}`,
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
