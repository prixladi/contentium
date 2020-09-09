import React, { FC, useMemo, useState } from 'react';

import ArticleCard, { ArticleInList } from './ArticleCard';
import TextSearch from './TextSearch';

type Props = {
  articles: ArticleInList[];
  autosearchTresholdCount: number;
};

const articleFilter = (search: string) => (article: ArticleInList) => {
  const searchParts = search
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((x) => {
      return /\S/.test(x);
    });

  let found = false;
  searchParts.forEach((part) => {
    found =
      article.title.toLowerCase().includes(part) ||
      article.author?.toLowerCase().includes(part) ||
      article.keywordText?.toLowerCase().includes(part) ||
      found;
  });

  return found;
};

const ArticleList: FC<Props> = ({ articles, autosearchTresholdCount }) => {
  const [search, setSearch] = useState(null as string | null);

  const filteredArticles = useMemo(
    () => (!search ? articles : articles.filter(articleFilter(search))),
    [search, articles],
  );

  return (
    <div className="article-card-list">
      <TextSearch
        searchChanged={setSearch}
        count={articles.length}
        autosearchTresholdCount={autosearchTresholdCount}
      />
      {filteredArticles.map((x) => (
        <ArticleCard key={x.id} article={x} />
      ))}
    </div>
  );
};

export type { ArticleInList };
export default ArticleList;
