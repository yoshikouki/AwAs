import { createTRPCRouter, mergeTRPCRouters } from "./trpc";

import { assetsRouter } from './routers/assets.route';
import { exampleRouter } from "./routers/example.route";
import { healthRouter } from "./routers/health.route";
import { profileRouter } from "./routers/profile.route";
import { settingsRouter } from './routers/settings.route';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = mergeTRPCRouters(
  healthRouter,
  profileRouter,
  assetsRouter,
  settingsRouter,
  createTRPCRouter({
    example: exampleRouter,
  })
);

// export type definition of API
export type AppRouter = typeof appRouter;
