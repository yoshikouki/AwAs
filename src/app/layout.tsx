import "../styles/globals.css";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import DefaultLayout from "../components/DefaultLayout";
import { SessionProvider } from "next-auth/react";
import ThemeContextProvider from "../components/ThemeContextProvider";
import AuthProvider from "../components/AuthProvider";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children, ...props }: Props) {
  return (
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <ThemeContextProvider>
          <AuthProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
