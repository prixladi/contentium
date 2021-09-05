import React, { FC } from 'react';
import { ArticlePreview } from '@shared/api/models';
import NextLink from 'next/link';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Markdown from './Markdown';
import ArticleMetadata from './ArticleMetadata';

type ArticleInList = Omit<ArticlePreview, 'brief'> & {
  brief?: MDXRemoteSerializeResult | null;
};

type Props = {
  article: ArticleInList;
};

const ArticleCard: FC<Props> = ({ article }) => (
  <div className="flex-1">
    <NextLink href={`/articles/${article.id}`}>
      <h2 className="link article-card-heading">
        {article.title}
        {article.highlighted && ' ⭐'}
      </h2>
    </NextLink>
    <ArticleMetadata article={article} />
    {article.brief && <Markdown content={article.brief} />}
  </div>
);

export type { ArticleInList };
export default ArticleCard;
