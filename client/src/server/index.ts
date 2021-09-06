import { Article, ArticlePreview } from '@shared/api/models';
import fs from 'fs';
import path from 'path';

const articlesFolder = './data/articles';
const metadataFile = './metadata.json';
const contentFile = './content.md';

const getSettings = () => {
  var data = fs.readFileSync('./data/settings.json');
  return JSON.parse(data.toString());
};

const getArticles = (): ArticlePreview[] => {
  var data = fs.readdirSync(articlesFolder);

  var articles: ArticlePreview[] = [];

  data.forEach((x) => {
    if (fs.existsSync(path.join(articlesFolder, x))) {
      var metadata = fs.readFileSync(path.join(articlesFolder, x, metadataFile));
      var json = JSON.parse(metadata.toString());
      json.id = x;
      articles.push(json);
    }
  });

  return articles;
};

const getArticle = (id: string): Article | null => {
  if (!fs.existsSync(path.join(articlesFolder, id))) {
    return null;
  }

  var metadata = fs.readFileSync(path.join(articlesFolder, id, metadataFile));
  var content = fs.readFileSync(path.join(articlesFolder, id, contentFile));

  var json = JSON.parse(metadata.toString());
  json.content = content.toString();

  return json;
};

export { getArticles, getSettings, getArticle };
