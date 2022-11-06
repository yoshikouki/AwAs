import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { config } from "../config";

export const requiredAuth = withAuthenticationRequired;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const { user, getAccessTokenSilently, isLoading, loginWithRedirect, logout } =
    useAuth0();

  useEffect(() => {
    (async () => setAccessToken(await getAccessTokenSilently()))();
  }, []);

  return {
    user,
    accessToken,
    isLoading,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: config.frontend.baseUrl }),
  };
};
