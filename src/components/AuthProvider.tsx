"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface Props {
  children: ReactNode;
  session: Session | null;
}

const AuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
