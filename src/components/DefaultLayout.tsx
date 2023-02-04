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
