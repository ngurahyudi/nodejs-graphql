import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import configs from './configurations';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: configs.DB_HOST,
  port: +configs.DB_PORT,
  database: configs.DB_DATABASE,
  username: configs.DB_USERNAME,
  password: configs.DB_PASSWORD,
  models: [path.join(__dirname, '../models/**/*.entity.ts')],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.entity')) ===
      member.toLowerCase()
    );
  },
});
