import { useEffect, useState } from "react";
import { config } from "../config";
import { useAuth } from "./auth";

type FetchApiResponse<T> = {
  error: Error | null;
  loading: boolean;
  data: T | null;
};

export const useApi = () => {
  const { getAccessToken } = useAuth();

  const fetchApi = async <T>(
    path: string,
    withAuth: boolean = false,
    option?: RequestInit
  ) => {
    const fetchOption = option || { method: "GET" };
    if (withAuth) {
      const accessToken = await getAccessToken();
      Object.assign(fetchOption, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    const response = await fetch(`${config.api.baseUrl}${path}`, fetchOption);
    return (await response.json()) as T;
  };

  return {
    fetchApi,
  };
};

function useFetchApi<T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
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
        const response = await fetchApi<T>(path, withAuth, option);
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

export const useGet = <T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "GET", ...option });
export const usePost = <T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "POST", ...option });
export const usePut = <T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "PUT", ...option });
export const usePatch = <T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "PATCH", ...option });
export const useDelete = <T>(
  path: string,
  withAuth: boolean = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "DELETE", ...option });
