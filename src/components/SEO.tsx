
import Head from 'next/head';
import path from 'path';
import React, { FC } from 'react';

import { Article, SettingsOptions } from '../server/models';

type SEOProps = { title: string } & Partial<{
  metaDescription: string | null;
  metaKeywords: string | null;
  ogSiteName: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogUrl: string | null;
  ogImage: string | null;
}>;

const removeUndefinedForNextJsSerializing = <T,>(props: T): T =>
  Object.fromEntries(Object.entries(props as any).filter(([, value]) => value !== undefined)) as T;

const createSEOProps = (options: SettingsOptions, article?: Article): SEOProps => {
  let url: string | null | undefined;
  let imageUrl: string | null | undefined;

  if (!!article && !!options.ogUrl) {
    url = path.join(options.ogUrl, 'articles', article.id);
  } else {
    url = options.ogUrl;
  }

  const pages = 'assets/pages';

  if (!!options.ogUrl) {
    if (!!article?.ogImageExtension) {
      imageUrl = path.join(options.ogUrl, pages, `${article.id}.${article.ogImageExtension}`);
    } else if (!!options.ogImageExtension) {
      imageUrl = path.join(options.ogUrl, pages, `home.${options.ogImageExtension}`);
    }
  }

  return removeUndefinedForNextJsSerializing({
    title: article?.title ?? options.mainTitle,
    metaDescription: article?.metaDescription ?? options.metaDescription,
    metaKeywords: article?.keywordText,
    ogTitle: article?.title ?? options.mainTitle,
    ogDescription: article?.metaDescription ?? options.metaDescription,
    ogImage: imageUrl,
    ogUrl: url,
    ogSiteName: options.mainTitle,
  });
};

const SEO: FC<SEOProps> = ({
  title,
  metaDescription,
  metaKeywords,
  ogSiteName,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}) => (
  <Head>
    <title>{title}</title>
    <meta property="og:type" content="website" />
    {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
    {metaDescription && <meta name="description" content={metaDescription} />}
    {metaKeywords && <meta name="keywords" content={metaKeywords} />}
    {ogUrl && <meta property="og:url" content={ogUrl} />}
    {ogTitle && <meta property="og:title" content={ogTitle} />}
    {ogDescription && <meta property="og:description" content={ogDescription} />}
    {ogImage && <meta property="og:image" content={ogImage} />}
    {ogTitle && <meta property="twitter:title" content={ogTitle} />}
    {ogDescription && <meta property="twitter:description" content={ogDescription} />}
    {ogImage && <meta property="twitter:image" content={ogImage} />}
  </Head>
);

export type { SEOProps };
export { createSEOProps };
export default SEO;
