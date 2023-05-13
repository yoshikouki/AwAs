import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login: () => signIn(),
    logout: () => signOut(),
  };
};
