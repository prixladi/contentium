import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider defaultTheme="dark" attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
