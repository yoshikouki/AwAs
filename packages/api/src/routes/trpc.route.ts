import { mergeRouters } from "../lib/trpc";
import { healthTrpcRouter } from "./health.route";
import { profileTrpcRouter } from "./profile.route";

export const publicTrpcRouter = mergeRouters(healthTrpcRouter);
export type PublicTRPCRouter = typeof publicTrpcRouter;

export const authedTrpcRouter = mergeRouters(profileTrpcRouter);
export type AuthedTRPCRouter = typeof authedTrpcRouter;
