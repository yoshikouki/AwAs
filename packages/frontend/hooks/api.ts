import { useEffect, useState } from "react";
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

export function useGet<T>(path: string, option?: { withAuth: boolean }) {
  const [res, setRes] = useState<T | undefined>(undefined);
  const { get, getWithAuth } = useApi();

  useEffect(() => {
    (async () => {
      const response = option?.withAuth
        ? await getWithAuth(path)
        : await get(path);
      setRes(response);
    })();
  }, []);

  return res;
}
