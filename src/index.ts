import express, { Express, Request, Response } from 'express';
import configs from './configs/configurations';
import { sequelize } from './configs/db.config';
import { add } from './models/actor/actor.service';
import { CreateActorDto } from './models/actor/dto/create-actor.dto';

const app: Express = express();

const APP_PORT = configs.APP_PORT;

(async () => {
  try {
    // await sequelize.sync();
    await sequelize.authenticate();
    // .then(() => {
    //   const actor: CreateActorDto = {
    //     name: 'Jean Paul',
    //   };
    //   return add(actor);
    // })
    // .then((res) => console.log(res));

    app.listen(APP_PORT, () => {
      console.log(
        `⚡️[server]: The server is running at http://localhost:${APP_PORT}`,
      );
    });
  } catch (error) {
    process.exit(1);
  }
})();
