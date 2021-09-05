import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { fetchArticle, fetchArticles, fetchSettings } from '../../api';
import React, { useEffect } from 'react';
import { ArticlePreview } from '@shared/api/models';
import Head from 'next/head';
import Content from '../../components/Content';
import Markdown from '../../components/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/link';
import ArticleMetadata from '../../components/ArticleMetadata';
import Prism from 'prismjs';
import { useCodeHighlights } from '../../hooks/useCodeHighlights';

type ArticleSerialized = Omit<Omit<ArticlePreview, 'content'>, 'brief'> & {
  brief?: MDXRemoteSerializeResult | null;
  content: MDXRemoteSerializeResult;
};

type Props = {
  article: ArticleSerialized;
  settings: {
    title: string;
    footer: MDXRemoteSerializeResult;
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
        footer: await serialize(settings.mainFooter),
      },
    },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({ article, settings }) => {
  useCodeHighlights();

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
          <ArticleMetadata article={article} />
        </header>

        <main>
          <Markdown content={article.content} />
        </main>

        <footer className="footer">
          <Markdown content={settings.footer} />
        </footer>
      </Content>
    </div>
  );
};

export default Home;
