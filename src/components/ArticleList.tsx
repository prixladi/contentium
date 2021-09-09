import React, { FC, useState } from 'react';
import ArticleCard, { ArticleInList } from './ArticleCard';
import TextSearch from './TextSearch';

type Props = {
  articles: ArticleInList[];
  autosearchTresholdCount: number;
};

const articleFilter = (search?: string | null) => (article: ArticleInList) => {
  var loverCaseSearch = search?.toLowerCase();
  return (
    !loverCaseSearch ||
    article.title.toLowerCase().includes(loverCaseSearch) ||
    article.author?.toLowerCase().includes(loverCaseSearch) ||
    article.keywordText?.toLowerCase().includes(loverCaseSearch)
  );
};

const ArticleList: FC<Props> = ({ articles, autosearchTresholdCount }) => {
  const [search, setSearch] = useState(null as string | null);

  return (
    <div className="article-card-list">
      <TextSearch searchChanged={setSearch} count={articles.length} autosearchTresholdCount={autosearchTresholdCount} />
      {articles.filter(articleFilter(search)).map((x) => (
        <ArticleCard key={x.id} article={x} />
      ))}
    </div>
  );
};

export type { ArticleInList };
export default ArticleList;
