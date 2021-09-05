import Router from 'express-promise-router';
import { articlesRouter } from './controllers/articlesController';
import { settingsRouter } from './controllers/settingsController';

const router = Router();

router.use(articlesRouter);
router.use(settingsRouter);

const apiRouter = Router();
apiRouter.use('/api/v1', router);
export { apiRouter };
