"use client";

import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { config } from "../config";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const onRedirectCallback = (appState: AppState | undefined) =>
    router.push(appState?.returnTo || config.auth0.baseUrl);

  return (
    <Auth0Provider
      domain={config.auth0.issuerBaseUrl}
      clientId={config.auth0.clientId}
      redirectUri={config.auth0.baseUrl}
      onRedirectCallback={onRedirectCallback}
      audience={config.auth0.audienceBaseUrl}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
