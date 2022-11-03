"use client"

import { ReactNode } from "react";
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { auth0 } from '../config/auth0';
import { useRouter } from 'next/router';


interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const onRedirectCallback = (appState: AppState | undefined) =>
    router.push(appState?.returnTo || auth0.baseUrl);

    return (
    <Auth0Provider
      domain={auth0.issuerBaseUrl}
      clientId={auth0.clientId}
      redirectUri={auth0.baseUrl}
      onRedirectCallback={onRedirectCallback}
      audience={auth0.audienceBaseUrl}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
