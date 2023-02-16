import app from '../src/app';
import dotenv from 'dotenv';
import path from 'path';
import { authChecker } from '../src/helpers';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import { Sequelize } from 'sequelize-typescript';

dotenv.config({
  path: path.resolve(
    `${process.cwd()}/src/configs/env/.env.${process.env.NODE_ENV}`,
  ),
});

let sequelize: Sequelize;

beforeAll(async () => {
  // const mem = newDb();

  sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [path.join(__dirname, '../src/models/**/*.entity.{ts,js}')],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.entity')) ===
        member.toLowerCase()
      );
    },
    logging: false,
  });

  const schema = await buildSchema({
    resolvers: [
      path.join(__dirname, '../src/models/**/resolver/*.resolver.{ts,js}'),
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
      graphqlHTTP((req, res) => {
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

  await sequelize.authenticate();
});

beforeEach(async () => {
  // const models = sequelize.modelManager.models;

  await sequelize.sync({ force: true });

  // models.forEach(async (model) => {
  //   await model.destroy({ where: {}, force: true });
  // });

  jest.clearAllMocks();
});

afterAll(async () => {
  await sequelize.close();
});
