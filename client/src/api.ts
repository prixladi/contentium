import { Article, ArticlePreview, SettingsOptions } from '@shared/api/models';
import { getSettings, getArticles, getArticle } from './server';

const fetchSettings = async (): Promise<SettingsOptions> => {
  if (process.env.CONTENTIUM_MODE === 'static') {
    return getSettings();
  }

  var res = await fetch(createUrl('api/v1/settings'));

  if (!res.ok) {
    throw new Error(`Unexpected status code ${res.status} - ${res.statusText}`);
  }

  return await res.json();
};

const fetchArticles = async (): Promise<ArticlePreview[]> => {
  if (process.env.CONTENTIUM_MODE === 'static') {
    return getArticles();
  }

  var res = await fetch(createUrl('api/v1/articles'));

  if (!res.ok) {
    throw new Error(`Unexpected status code ${res.status} - ${res.statusText}`);
  }

  return await res.json();
};

const fetchArticle = async (id: string): Promise<Article | null> => {
  if (process.env.CONTENTIUM_MODE === 'static') {
    return getArticle(id);
  }

  var res = await fetch(createUrl(`api/v1/articles/${id}`));

  if (res.status == 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Unexpected status code ${res.status} - ${res.statusText}`);
  }

  return await res.json();
};

const fetchArticleByTitle = async (title: string): Promise<Article | null> => {
  var res = await fetch(createUrl(`api/v1/articles/by-title/${title}`));

  if (res.status == 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Unexpected status code ${res.status} - ${res.statusText}`);
  }

  return await res.json();
};

const createUrl = (path: string) => {
  return new URL(path, process.env.SERVER_URL).href;
};

export { fetchSettings, fetchArticles, fetchArticle, fetchArticleByTitle };
