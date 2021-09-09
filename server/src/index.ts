import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import express from 'express';
import db from './db';
import { articleAdminOptions, settingAdminOptions } from './admin';
import { apiRouter } from './api';

AdminJS.registerAdapter(AdminJSSequelize);
const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@contentium.com',
  password: process.env.ADMIN_PASSWORD || 'Pass@word1',
};

const run = async () => {
  await db.sequelize.authenticate();

  const app = express();
  const adminJs = new AdminJS({
    rootPath: '/admin',
    databases: [db.sequelize],
    resources: [
      {
        resource: db.Article,
        options: articleAdminOptions,
      },
      {
        resource: db.Setting,
        options: settingAdminOptions
      },
    ],
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email: string, password: string) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN;
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.COOKIE_PASSWORD || 'i5h1ZTkAZb',
  });

  app.set('db', db);

  app.use(apiRouter);
  app.use(adminJs.options.rootPath, router);

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`AdminJs is under localhost:${port}${adminJs.options.rootPath}`));
};

run();
