import { authedProcedure, publicProcedure, router } from "../lib/trpc";

export const publicTrpcRouter = router({
  health: publicProcedure.query((_req) => "ok"),
});;
export const authedTrpcRouter = router({
  profile: authedProcedure.query(({ ctx }) => `ok, ${ctx.uid}`)
});


export type PublicTRPCRouter = typeof publicTrpcRouter;
export type AuthedTRPCRouter = typeof authedTrpcRouter;
