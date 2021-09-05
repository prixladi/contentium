import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { fetchArticle, fetchArticleByTitle, fetchArticles, fetchSettings } from '../../api';
import React from 'react';
import { Article, ArticlePreview } from '@shared/api/models';
import Head from 'next/head';
import Content from '../../components/Content';
import Markdown from '../../components/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/link';

type ArticleSerialized = Omit<Omit<ArticlePreview, 'content'>, 'brief'> & {
  brief?: MDXRemoteSerializeResult | null;
  content: MDXRemoteSerializeResult;
};

type Props = {
  article: ArticleSerialized;
  settings: {
    title: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchArticles();
  return {
    paths: articles.map((x) => ({
      params: { id: x.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const settings = await fetchSettings();
  const article = await fetchArticle(params!.id as string);
  if (!article) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      article: {
        ...article,
        content: await serialize(article.content),
        brief: !article.brief ? null : await serialize(article.brief),
      },
      settings: {
        title: settings.mainTitle,
      },
    },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({ article, settings }) => {
  return (
    <div>
      <Head>
        <title>{article.title}</title>
        {article.keyworkText && <meta name="description" content={article.keyworkText} />}
      </Head>

      <Content>
        <header>
          <NextLink href={`/`}>
            <h3 className="link back-to-link">{settings.title}</h3>
          </NextLink>
          <h1>{article.title}</h1>
        </header>

        <main>
          <Markdown content={article.content} />
        </main>
      </Content>
    </div>
  );
};

export default Home;
