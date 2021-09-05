import { FC } from 'react';
import { ArticlePreview } from '@shared/api/models';
import NextLink from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { componentsMap } from '../markdown';

type ArticleInList = Omit<ArticlePreview, 'brief'> & {
  brief?: MDXRemoteSerializeResult | null;
};

type Props = {
  article: ArticleInList;
};

const ArticleCard: FC<Props> = ({ article }) => (
  <div key={article.id} className="flex-1">
    <NextLink href={`/posts/${article.id}`}>
      <h2 className="link article-card-heading">{article.title}</h2>
    </NextLink>
    {article.brief && (
      <p>
        <MDXRemote {...article.brief} components={componentsMap} />
      </p>
    )}
  </div>
);

export type { ArticleInList };
export default ArticleCard;
