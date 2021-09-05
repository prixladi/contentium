import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Content from '../components/Content';
import ArticleCard, { ArticleInList } from '../components/ArticleCard';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { fetchArticles, fetchSettings } from '../api';
import { componentsMap } from '../markdown';

type Props = {
  articles: ArticleInList[];
  settings: {
    title: string;
    description: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const settings = await fetchSettings();
  const articles = await fetchArticles();
  const articlesInList: ArticleInList[] = [];

  for (const article of articles) {
    articlesInList.push({ ...article, brief: !article.brief ? null : await serialize(article.brief) });
  }

  return {
    props: {
      articles: articlesInList,
      settings: {
        title: settings.mainTitle,
        description: await serialize('This is personal blog of **Ladislav Prix** where you can read about his life hobbies and so on.'),
      },
    },
    revalidate: 20,
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>{props.settings.title}</title>
      </Head>

      <Content>
        <h1>{props.settings.title}</h1>
        <MDXRemote {...props.settings.description} components={componentsMap} />
        <div className="flex-1 space-y-2">
          {props.articles.map((x) => (
            <ArticleCard article={x} />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default Home;
