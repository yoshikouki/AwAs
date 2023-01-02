import { initTRPC } from "@trpc/server";
import { Context } from "../middleware/trpc.middleware";

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
