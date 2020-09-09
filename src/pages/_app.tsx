import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'next-themes';

import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-tomorrow.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="theme-color" content="#1A202C" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
