import { useEffect, useState } from "react";

type FetchApiResponse<T> = {
  error: Error | null;
  loading: boolean;
  data: T | null;
};

export const useRestApi = () => {
  const getAccessToken = () => "";

  const fetchApi = async <T>(
    path: string,
    withAuth = false,
    option?: RequestInit
  ) => {
    let headersOption: HeadersInit = {};
    if (withAuth) {
      const accessToken = await getAccessToken();
      headersOption = { Authorization: `Bearer ${accessToken}` };
    }
    const response = await fetch(`http://localhost:8888/${path}`, {
      method: "GET",
      headers: {
        ...headersOption,
        "Content-Type": "application/json",
        ...option?.headers,
      },
      ...option,
    });
    return (await response.json()) as T;
  };

  return {
    fetchApi,
  };
};

function useFetchApi<T>(path: string, withAuth = false, option?: RequestInit) {
  const [state, setState] = useState<FetchApiResponse<T>>({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const { fetchApi } = useRestApi();

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
  }, [fetchApi, option, path, refreshIndex, state, withAuth]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
}

export const useRestGet = <T>(
  path: string,
  withAuth = false,
  option?: RequestInit
) => useFetchApi<T>(path, withAuth, { method: "GET", ...option });
