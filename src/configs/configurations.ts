import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(`${process.cwd()}/src/configs/env/.env`),
});

const configs = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  // App configurations
  APP_PORT: process.env.APP_PORT || 3000,

  // Database configurations
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
};

export default configs;
