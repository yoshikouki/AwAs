import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import ThemeContextProvider from "../components/ThemeContextProvider";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <ThemeContextProvider>
            {children}
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "AwAs - Awesome Assets",
  viewport: { width: "device-width", initialScale: 1 },
};
