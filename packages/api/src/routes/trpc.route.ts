import { mergeRouters } from "../lib/trpc";
import { assetsTrpcRouter } from "./assets.route";
import { healthTrpcRouter } from "./health.route";
import { profileTrpcRouter } from "./profile.route";
import { settingsTrpcRouter } from "./settings.route";

export const publicTrpcRouter = mergeRouters(healthTrpcRouter);
export type PublicTRPCRouter = typeof publicTrpcRouter;

export const authedTrpcRouter = mergeRouters(profileTrpcRouter, settingsTrpcRouter, assetsTrpcRouter);
export type AuthedTRPCRouter = typeof authedTrpcRouter;
