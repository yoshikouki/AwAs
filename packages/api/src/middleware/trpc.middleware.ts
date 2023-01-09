import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "../lib/trpc";
import { authedTrpcRouter, publicTrpcRouter } from "../routes/trpc.route";

export const publicTrpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: publicTrpcRouter,
  createContext,
});
export const authedTrpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: authedTrpcRouter,
  createContext,
});
