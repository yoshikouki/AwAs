import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeContextProvider from '../components/ThemeContextProvider'
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0 } from '../config/auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Auth0Provider
        domain={auth0.issuerBaseUrl}
        clientId={auth0.clientId}
        redirectUri={auth0.baseUrl}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    </ThemeContextProvider>
  )
}

export default MyApp
