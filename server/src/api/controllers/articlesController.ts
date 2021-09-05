import Router from 'express-promise-router';
import * as e from 'express';
import { Request, Response } from 'express';
import { Db } from '../../db';
import { isUUID } from './helpers';
import { Article } from '@shared/api/models';

const router: e.Router = Router();

router.get<{}, Article[]>('/', async (req: Request, res: Response) => {
  const { Article } = req.app.get('db') as Db;
  const articles = await Article.findAll({
    attributes: { exclude: ['content'] },
    order: [
      ['highlighted', 'DESC'],
      ['createdAt', 'DESC NULLS LAST'],
    ],
  });

  return res.status(200).json(articles);
});

router.get<{ articleId: string }, Article>('/:articleId', async (req: Request, res: Response) => {
  if (!isUUID(req.params.articleId)) {
    return res.status(404).end();
  }

  const { Article } = req.app.get('db') as Db;
  const article = await Article.findOne({ where: { id: req.params.articleId } });
  if (article) {
    return res.status(200).json(article);
  }

  return res.status(404).end();
});

router.get<{ articleTitle: string }, Article>('/by-title/articleTitle', async (req: Request, res: Response) => {
  if (!isUUID(req.params.articleId)) {
    return res.status(404).end();
  }

  const { Article } = req.app.get('db') as Db;
  const article = await Article.findOne({ where: { title: req.params.articleTitle } });
  if (article) {
    return res.status(200).json(article);
  }

  return res.status(404).end();
});

const articlesRouter: e.Router = Router();
articlesRouter.use('/articles', router);
export { articlesRouter };
