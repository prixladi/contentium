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
  <div className="font-thin flex-1">
    {article.author ? <div>👤 {article.author} ·</div> : ''}
    {article.createdAt ? <div>📅 {format(new Date(article.createdAt), 'MMMM dd, yyyy')} ·</div> : ''}
    {article.readingTimeInMinutes ? <div> 🕒 {article.readingTimeInMinutes} min read ·</div> : ''}
  </div>
);

export default ArticleMetadata;
