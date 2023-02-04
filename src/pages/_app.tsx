import { type AppType } from "next/app";
import { type Session } from "next-auth";
import Head from "next/head";

import { api } from "../utils/api";

import "../styles/globals.css";
import AuthProvider from "../components/AuthProvider";
import DefaultLayout from "../components/DefaultLayout";
import ThemeContextProvider from "../components/ThemeContextProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const pageTitle = "";
  const baseTitle = "AwAs - Awesome Assets";
  return (
    <>
      <Head>
        <title>{pageTitle + baseTitle}</title>
      </Head>

      <ThemeContextProvider>
        <AuthProvider session={session}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </AuthProvider>
      </ThemeContextProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
