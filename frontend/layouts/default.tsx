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
