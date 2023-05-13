import Home from "../components/Home";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export const metadata: Metadata = {
  title: "AwAs - Awesome Assets",
  viewport: { width: "device-width", initialScale: 1 },
};

export default HomePage;
