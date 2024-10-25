import React, { FC } from 'react';

import { format } from 'date-fns';

type Props = {
  article: {
    author?: string | null;
    createdAt?: string | null;
    readingTimeInMinutes?: number | null;
  };
};

const ArticleMetadata: FC<Props> = ({ article }) => (
  <div className="article-metadata">
    {article.author ? <div>👤 {article.author} ·</div> : ''}
    {article.createdAt ? (
      <div>📅 {format(new Date(article.createdAt), 'MMMM dd, yyyy')} ·</div>
    ) : (
      ''
    )}
    {article.readingTimeInMinutes ? <div> 🕒 {article.readingTimeInMinutes} min read ·</div> : ''}
  </div>
);

export default ArticleMetadata;
