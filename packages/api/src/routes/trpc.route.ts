import { mergeRouters } from "../lib/trpc";
import { assetsTrpcRouter } from "./assets.route";
import { healthTrpcRouter } from "./health.route";
import { profileTrpcRouter } from "./profile.route";

export const publicTrpcRouter = mergeRouters(healthTrpcRouter);
export type PublicTRPCRouter = typeof publicTrpcRouter;

export const authedTrpcRouter = mergeRouters(profileTrpcRouter, assetsTrpcRouter);
export type AuthedTRPCRouter = typeof authedTrpcRouter;
