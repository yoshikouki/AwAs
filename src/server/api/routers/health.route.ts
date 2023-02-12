import { createTRPCRouter, publicProcedure } from "../trpc";

export const healthRouter = createTRPCRouter({
  health: publicProcedure.query((_req) => "ok"),
});
