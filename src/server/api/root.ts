import { createTRPCRouter, mergeTRPCRouters } from "./trpc";
import { exampleRouter } from "./routers/example.route";
import { healthRouter } from "./routers/health.route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = mergeTRPCRouters(
  healthRouter,
  createTRPCRouter({
    example: exampleRouter,
  })
);

// export type definition of API
export type AppRouter = typeof appRouter;
