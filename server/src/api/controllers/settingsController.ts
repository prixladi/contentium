import Router from 'express-promise-router';
import * as e from 'express';
import { Request, Response } from 'express';
import { Db } from '../../db';
import { Settings } from '@shared/api/models';

const router: e.Router = Router();

router.get<{}, Settings>('/', async (req: Request, res: Response) => {
  const { Setting } = req.app.get('db') as Db;

  const all = await Setting.findAll();
  const settings = all.reduce((curr, x) => {
    return { [x.key]: x.value, ...curr };
  }, {} as { [key: string]: string });

  return res.status(200).json(settings);
});

const settingsRouter: e.Router = Router();
settingsRouter.use('/settings', router);
export { settingsRouter };
