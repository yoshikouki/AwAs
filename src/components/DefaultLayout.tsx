import Footer from "./Footer";
import HeaderNavigation from "./HeaderNavigation";
import MainNavigation from "./MainNavigation";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
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
