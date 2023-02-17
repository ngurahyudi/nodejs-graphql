const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(
    `${process.cwd()}/src/configs/env/.env.${process.env.NODE_ENV}`,
  ),
});

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: '__sequelize_data',
  migrationStorageTableName: '__sequelize_meta',
};
