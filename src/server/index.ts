import { Article, ArticlePreview, Settings, SettingsOptions } from './models';
import fs from 'fs';
import path from 'path';

const articlesFolder = './data/articles';
const metadataFile = './metadata.json';
const contentFile = './content.md';

const getSettings = async (): Promise<SettingsOptions> => {
  const data = fs.readFileSync('./data/settings.json');
  return JSON.parse(data.toString());
};

const getArticles = async (): Promise<ArticlePreview[]> => {
  const data = fs.readdirSync(articlesFolder);

  let articles: ArticlePreview[] = [];

  data.forEach((x) => {
    if (fs.existsSync(path.join(articlesFolder, x))) {
      const metadata = fs.readFileSync(path.join(articlesFolder, x, metadataFile));
      const json = JSON.parse(metadata.toString());
      json.id = x;
      articles.push(json);
    }
  });

  return articles.sort((a1, a2) => {
    if (a1.highlighted && !a2.highlighted) {
      return -1;
    }

    if (a2.highlighted) {
      return 1;
    }

    if (!a2.createdAt) {
      return -1;
    }

    if (!a1.createdAt) {
      return 1;
    }

    return new Date(a1.createdAt) > new Date(a2.createdAt) ? -1 : 0;
  });
};

const getArticle = async (id: string): Promise<Article | null> => {
  if (!fs.existsSync(path.join(articlesFolder, id))) {
    return null;
  }

  const metadata = fs.readFileSync(path.join(articlesFolder, id, metadataFile));
  const content = fs.readFileSync(path.join(articlesFolder, id, contentFile));

  const json = JSON.parse(metadata.toString());
  json.content = content.toString();
  json.id = id;

  return json;
};

export { getArticles, getSettings, getArticle };
