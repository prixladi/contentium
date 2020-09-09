import type { NextPage, GetStaticProps } from 'next';
import React from 'react';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { ArticleInList } from '../components/ArticleCard';
import ArticleList from '../components/ArticleList';
import Content from '../components/Content';
import Markdown from '../components/Markdown';
import SEO, { createSEOProps, SEOProps } from '../components/SEO';
import ThemeSwitch from '../components/ThemeSwitch';
import { getArticles, getSettings } from '../server';

type Props = {
  articles: ArticleInList[];
  seoProps: SEOProps;
  settings: {
    title: string;
    metaDesctiption: string;
    autosearchTresholdCount: number;
    description: MDXRemoteSerializeResult;
    footer: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const settings = await getSettings();
  const articles = await getArticles();
  const articlesInList: ArticleInList[] = [];

  for (const article of articles) {
    articlesInList.push({
      ...article,
      brief: !article.brief ? null : await serialize(article.brief),
    });
  }

  return {
    props: {
      articles: articlesInList,
      settings: {
        title: settings.mainTitle,
        metaDesctiption: settings.metaDescription,
        autosearchTresholdCount: Number(settings.autosearchTresholdCount),
        description: await serialize(settings.mainDescription),
        footer: await serialize(settings.footer),
      },
      seoProps: createSEOProps(settings),
    },
    revalidate: 20,
  };
};

const Home: NextPage<Props> = ({ articles, settings, seoProps }) => (
  <div>
    <SEO {...seoProps} />
    <Content>
      <header>
        <ThemeSwitch />
        <h1>{settings.title}</h1>
        <Markdown content={settings.description} />
      </header>

      <main>
        <ArticleList
          autosearchTresholdCount={settings.autosearchTresholdCount}
          articles={articles}
        />
      </main>

      <footer className="footer">
        <Markdown content={settings.footer} />
      </footer>
    </Content>
  </div>
);

export default Home;
