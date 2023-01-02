import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();

export const trpcRouter = trpc.router({
  health: trpc.procedure.query((req) => "ok")
});

export type TRPCRouter = typeof trpcRouter;

export const trpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: trpcRouter,
  createContext,
});
