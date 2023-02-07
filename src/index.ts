import express, { Express, Request, Response } from 'express';
import configs from './configs/configurations';

const app: Express = express();

const APP_PORT = configs.APP_PORT;

app.listen(APP_PORT, () => {
  console.log(
    `⚡️[server]: The server is running at http://localhost:${APP_PORT}`,
  );
});
