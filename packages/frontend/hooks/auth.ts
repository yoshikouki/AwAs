import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { config } from "../config";

export const requiredAuth = withAuthenticationRequired;

export const useAuth = () => {
  const { user, getAccessTokenSilently, isLoading, loginWithRedirect, logout } =
    useAuth0();

  return {
    user,
    getAccessToken: getAccessTokenSilently,
    isLoading,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: config.frontend.baseUrl }),
  };
};
