import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-tomorrow.css';
import '../styles/globals.css';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="theme-color" content="#1A202C" />
    </Head>
    <ThemeProvider defaultTheme="light" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
