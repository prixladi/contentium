import { Sequelize } from 'sequelize';
import createArticle from './models/article';
import createSetting from './models/setting';

type Db = {
  Sequelize: Sequelize;
  sequelize: Sequelize;
  Article: ReturnType<typeof createArticle>;
  Setting: ReturnType<typeof createSetting>;
};

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + './../../sequelizeConfig.json')[env.toLowerCase()];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  Sequelize: sequelize,
  sequelize: sequelize,
  Article: createArticle(sequelize),
  Setting: createSetting(sequelize),
} as Db;

export type { Db };
export default db;
