import Footer from "./Footer";
import Head from "next/head";
import HeaderNavigation from "./HeaderNavigation";
import MainNavigation from "./MainNavigation";
import { ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
}

const DefaultLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title} | AwAs - Awesome Assets</title>
      </Head>
      <HeaderNavigation />
      <MainNavigation />
      <div className="sm:pl-24 lg:pl-80">
        <main className="mx-auto mt-4 sm:mt-12">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
