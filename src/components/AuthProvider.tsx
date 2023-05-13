"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
