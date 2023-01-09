import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AuthedTRPCRouter, PublicTRPCRouter } from "../../api/src/routes/trpc.route";
import { config } from "../config";
import { useAuth } from "./auth";

type ApiOptions = { withAuth: boolean }

export const useApi = (options?: ApiOptions) => {
  const { getAccessToken } = useAuth();

  const publicClient = createTRPCProxyClient<PublicTRPCRouter>({
    links: [
      httpBatchLink({
        url: `${config.api.baseUrl}/trpc`,
      }),
    ],
  });
  const authedClient = createTRPCProxyClient<AuthedTRPCRouter>({
    links: [
      httpBatchLink({
        url: `${config.api.baseUrl}/trpc/authed/`,
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
  });

  return {
    client: options?.withAuth ? authedClient : publicClient,
    publicClient,
    authedClient,
  };
};
