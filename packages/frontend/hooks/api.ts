import { useEffect, useState } from "react";
import { config } from "../config";
import { useAuth } from "./auth";

type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface FetchApiOption {
  withAuth: boolean;
}
type FetchApiResponse<T> = {
  error: Error | null;
  loading: boolean;
  data: T | null;
};

export const useApi = () => {
  const { getAccessToken } = useAuth();

  const fetchApi = async <T>(
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
    return await response.json() as T;
  };

  return {
    fetchApi,
  };
};

function useFetchApi<T>(
  method: HttpMethodType,
  path: string,
  option?: FetchApiOption
) {
  const [state, setState] = useState<FetchApiResponse<T>>({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const { fetchApi } = useApi();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchApi(method, path, {
          withAuth: Boolean(option?.withAuth),
        });
        setState({
          ...state,
          data: response,
          error: null,
          loading: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          setState({
            ...state,
            error,
            loading: false,
          });
        }
      }
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
}

export const useGet = <T>(path: string, option?: FetchApiOption) =>
  useFetchApi<T>("GET", path, option);
export const usePost = <T>(path: string, option?: FetchApiOption) =>
  useFetchApi<T>("POST", path, option);
export const usePut = <T>(path: string, option?: FetchApiOption) =>
  useFetchApi<T>("PUT", path, option);
export const usePatch = <T>(path: string, option?: FetchApiOption) =>
  useFetchApi<T>("PATCH", path, option);
export const useDelete = <T>(path: string, option?: FetchApiOption) =>
  useFetchApi<T>("DELETE", path, option);
