import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const uid = req.auth?.payload.sub;
  return {
    req,
    res,
    uid,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const mergeRouters = trpc.mergeRouters;
export const middleware = trpc.middleware;

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.uid) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      uid: ctx.uid,
    },
  });
});

export const publicProcedure = trpc.procedure;
export const authedProcedure = trpc.procedure.use(isAuthed);
