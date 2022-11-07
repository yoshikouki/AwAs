import { useEffect, useState } from "react";
import { config } from "../config";
import { useAuth } from "./auth";

type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface FetchApiOption {
  withAuth: boolean;
}

export const useApi = () => {
  const { getAccessToken } = useAuth();

  const fetchApi = async (
    method: HttpMethodType,
    path: string,
    option?: FetchApiOption
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

function useFetchApi<T>(method: HttpMethodType, path: string, option?: FetchApiOption) {
  const [res, setRes] = useState<T | undefined>(undefined);
  const { fetchApi } = useApi();

  useEffect(() => {
    (async () => {
      const response = await fetchApi(method, path, {
        withAuth: Boolean(option?.withAuth),
      });
      setRes(response);
    })();
  }, []);

  return res;
}

export const useGet = <T>(path: string, option?: FetchApiOption) => useFetchApi<T>("GET", path, option);
export const usePost = <T>(path: string, option?: FetchApiOption) => useFetchApi<T>("POST", path, option);
export const usePut = <T>(path: string, option?: FetchApiOption) => useFetchApi<T>("PUT", path, option);
export const usePatch = <T>(path: string, option?: FetchApiOption) => useFetchApi<T>("PATCH", path, option);
export const useDelete = <T>(path: string, option?: FetchApiOption) => useFetchApi<T>("DELETE", path, option);
