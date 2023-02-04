import { api } from "../utils/api";

type ApiOptions = { withAuth: boolean }

export const useApi = (options?: ApiOptions) => {

  return {
    client: api,
  };
};
