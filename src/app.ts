import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

const app: Express = express();

app.use(cookieParser());

export default app;
