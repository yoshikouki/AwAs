import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { config } from "../config";

export const requiredAuth = withAuthenticationRequired;

export const useAuth = () => {
  const { isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect, logout } =
    useAuth0();

  return {
    isAuthenticated,
    getAccessToken: getAccessTokenSilently,
    isLoading,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: config.frontend.baseUrl }),
  };
};
