import type { GetStaticProps } from 'next';
import { getSettings } from '../server';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Content from '../components/Content';
import Markdown from '../components/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';

type Props = {
  settings: {
    title: string;
    footer: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const settings = await getSettings();

  return {
    props: {
      settings: {
        title: settings.mainTitle,
        footer: await serialize(settings.mainFooter),
      },
    },
    revalidate: 360,
  };
};

const NotFound: React.FC<Props> = ({ settings }) => {
  var router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Not found</title>
      </Head>

      <Content>
        <header>
          <NextLink href={`/`}>
            <h3 className="link back-to-link">{settings.title}</h3>
          </NextLink>
        </header>

        <footer className="footer">
          <Markdown content={settings.footer} />
        </footer>
      </Content>
    </div>
  );
};

export default NotFound;
