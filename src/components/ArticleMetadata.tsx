import { format } from 'date-fns';
import React, { FC } from 'react';

type Props = {
  article: {
    author?: string | null;
    createdAt?: string | null;
    readingTimeInMinutes?: number | null;
  };
};

const ArticleMetadata: FC<Props> = ({ article }) => (
  <div className="article-metadata">
    {article.author ? <div>๐ค {article.author} ยท</div> : ''}
    {article.createdAt ? (
      <div>๐ {format(new Date(article.createdAt), 'MMMM dd, yyyy')} ยท</div>
    ) : (
      ''
    )}
    {article.readingTimeInMinutes ? <div> ๐ {article.readingTimeInMinutes} min read ยท</div> : ''}
  </div>
);

export default ArticleMetadata;
