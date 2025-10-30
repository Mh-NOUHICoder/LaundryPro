// App wrapper
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import { AppProvider } from '../context/AppContext';
import Layout from '../components/layout/Layout';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </AuthProvider>
    </SessionProvider>
  );
}