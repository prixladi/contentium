import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { getArticle, getArticles, getSettings } from '../../server';
import React from 'react';
import { ArticlePreview } from '../../server/models';
import Head from 'next/head';
import Content from '../../components/Content';
import Markdown from '../../components/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/link';
import ArticleMetadata from '../../components/ArticleMetadata';
import { useCodeHighlights } from '../../hooks/useCodeHighlights';
import ThemeSwitch from '../../components/ThemeSwitch';
import SEO, { createSEOProps, SEOProps } from '../../components/SEO';

type ArticleSerialized = Omit<Omit<ArticlePreview, 'content'>, 'brief'> & {
  brief?: MDXRemoteSerializeResult | null;
  content: MDXRemoteSerializeResult;
};

type Props = {
  article: ArticleSerialized;
  seoProps: SEOProps;
  settings: {
    title: string;
    footer: MDXRemoteSerializeResult;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles();
  return {
    paths: articles.map((x) => ({
      params: { id: x.id },
    })),
    fallback: process.env.CONTENTIUM_ACTION !== 'export',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const settings = await getSettings();
  const article = await getArticle(params!.id as string);
  if (!article) {
    return {
      notFound: true,
      revalidate: 20,
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
        footer: await serialize(settings.footer),
      },
      seoProps: createSEOProps(settings, article),
    },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({ article, settings, seoProps }) => {
  useCodeHighlights();

  if (!article) {
    return (
      <div>
        <Content>
          <header>
            <h1>Loading ...</h1>
          </header>
        </Content>
      </div>
    );
  }

  return (
    <div>
      <SEO {...seoProps} />
      <Content>
        <header>
          <ThemeSwitch />
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
