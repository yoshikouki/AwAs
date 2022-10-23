import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeContextProvider from '../components/ThemeContextProvider'
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
