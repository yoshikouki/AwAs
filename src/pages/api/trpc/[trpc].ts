import { appRouter } from "../../../server/api/root";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTRPCContext } from "../../../server/api/trpc";
import { env } from "../../../env/server.mjs";
import { logger } from "./../../../utils/logger";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          logger.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
