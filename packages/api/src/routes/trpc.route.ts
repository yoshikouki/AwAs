import { publicProcedure, router } from "../lib/trpc";

export const trpcRouter = router({
  health: publicProcedure.query((_req) => "ok")
});

export type TRPCRouter = typeof trpcRouter;
