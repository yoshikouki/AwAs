import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { TRPCRouter } from "../../api/src/routes/trpc.route";
import { config } from "../config";
import { useAuth } from "./auth";

const trpcUrl = `${config.api.baseUrl}/trpc`
const createClient = (withAuth = false, getAccessToken: () => Promise<any>) =>
  withAuth
    ? createTRPCProxyClient<TRPCRouter>({
        links: [
          httpBatchLink({
            url: trpcUrl,
            async headers() {
              const accessToken = await getAccessToken();
              return accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                  }
                : {};
            },
          }),
        ],
      })
    : createTRPCProxyClient<TRPCRouter>({
        links: [
          httpBatchLink({
            url: trpcUrl,
          }),
        ],
      });

type ApiOptions = { withAuth: boolean }

export const useApi = (options?: ApiOptions) => {
  const { getAccessToken } = useAuth();
  const client = createClient(options?.withAuth, getAccessToken);
  return {
    client,
  };
};
