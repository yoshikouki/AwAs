import Head from "next/head";
import { ReactNode } from "react";
import Footer from "../components/Footer";
import HeaderNavigation from "../components/HeaderNavigation";
import MainNavigation from "../components/MainNavigation";

interface Props {
  title?: string;
  children?: ReactNode;
}

const DefaultLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{(title ? `${title} |` : "") + "Fundamental Charts"}</title>
        <meta
          name="description"
          content="Grate charts for fundamental analysis."
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <HeaderNavigation />
      <MainNavigation />
      <div className="relative sm:pl-80">
        <main className="mx-auto w-auto l-80px">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
