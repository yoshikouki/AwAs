import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const requiredAuth = withAuthenticationRequired;

  useEffect(() => {
    (async () => setAccessToken(await getAccessTokenSilently()))();
  }, []);

  return {
    user,
    requiredAuth,
    accessToken,
  };
};
