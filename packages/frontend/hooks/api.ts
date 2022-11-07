import { useEffect, useState } from "react";
import { config } from "../config";
import { useAuth } from "./auth";

type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const useApi = () => {
  const { getAccessToken } = useAuth();

  const fetchApi = async (
    method: HttpMethodType,
    path: string,
    option?: { withAuth: boolean }
  ) => {
    const fetchOption = { method };
    if (option?.withAuth) {
      const accessToken = await getAccessToken();
      Object.assign(fetchOption, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    const response = await fetch(`${config.api.baseUrl}${path}`, fetchOption);
    return await response.json();
  };

  return {
    fetchApi,
  };
};

export function useGet<T>(path: string, option?: { withAuth: boolean }) {
  const [res, setRes] = useState<T | undefined>(undefined);
  const { fetchApi } = useApi();

  useEffect(() => {
    (async () => {
      const response = await fetchApi("GET", path, {
        withAuth: Boolean(option?.withAuth),
      });
      setRes(response);
    })();
  }, []);

  return res;
}
