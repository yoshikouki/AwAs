import { config } from "../config";
import { useAuth } from "./auth";

export const useApi = () => {
  const { getAccessToken } = useAuth();

  const get = async (path: string) => {
    const response = await fetch(`${config.api.baseUrl}${path}`);
    return await response.json();
  };

  const getWithAuth = async (path: string) => {
    const accessToken = await getAccessToken();
    const response = await fetch(`${config.api.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  };

  return {
    get,
    getWithAuth,
  };
};
