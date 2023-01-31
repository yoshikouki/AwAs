import { createTRPCRouter, publicProcedure, authedProcedure } from "../trpc";

export const healthRouter = createTRPCRouter({
  health: publicProcedure.query((_req) => "ok"),
});
