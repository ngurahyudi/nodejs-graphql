import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

export default app;
