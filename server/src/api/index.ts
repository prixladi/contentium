import Router from 'express-promise-router';
import { articlesRouter } from './controllers/articlesController';

const router = Router();

router.use(articlesRouter);

const apiRouter = Router();
apiRouter.use('/api/v1', router);
export { apiRouter };
