import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import HeaderNavigation from "./HeaderNavigation";
import MainNavigation from "./MainNavigation";

interface Props {
  title?: string;
  children?: ReactNode;
}

const DefaultLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{(title ? `${title} |` : "") + "AwAs - Awesome Assets"}</title>
      </Head>

      <HeaderNavigation />
      <MainNavigation />
      <div className="sm:pl-24 lg:pl-80">
        <main className="mx-auto px-4 mt-12">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
