import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcRouter } from "../routes/trpc.route";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
export type Context = inferAsyncReturnType<typeof createContext>;

export const trpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: trpcRouter,
  createContext,
});
