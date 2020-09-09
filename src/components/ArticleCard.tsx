import NextLink from 'next/link';
import React, { FC } from 'react';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { ArticlePreview } from '../server/models';

import ArticleMetadata from './ArticleMetadata';
import Markdown from './Markdown';

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
