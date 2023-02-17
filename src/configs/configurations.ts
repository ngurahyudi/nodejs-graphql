import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    `${process.cwd()}/src/configs/env/.env.${process.env.NODE_ENV}`,
  ),
});

const configs = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  // App configurations
  APP_PORT: process.env.PORT || 3000,

  APP_ACCESS_TOKEN_SECRET: process.env.APP_ACCESS_TOKEN_SECRET,
  APP_ACCESS_TOKEN_EXP: process.env.APP_ACCESS_TOKEN_EXP,

  APP_REFRESH_TOKEN_SECRET: process.env.APP_REFRESH_TOKEN_SECRET,
  APP_REFRESH_TOKEN_EXP: process.env.APP_REFRESH_TOKEN_EXP,

  // Database configurations
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
};

export default configs;
