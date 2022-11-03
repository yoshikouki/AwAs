import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeContextProvider from '../components/ThemeContextProvider'
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { auth0 } from '../config/auth0';
import Head from "next/head";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const onRedirectCallback = (appState: AppState | undefined) =>
    router.push(appState?.returnTo || auth0.baseUrl);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ThemeContextProvider>
        <Auth0Provider
          domain={auth0.issuerBaseUrl}
          clientId={auth0.clientId}
          redirectUri={auth0.baseUrl}
          onRedirectCallback={onRedirectCallback}
        >
          <Component {...pageProps} />
        </Auth0Provider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp
